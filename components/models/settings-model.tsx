"use client"
import UseModel from "@/hooks/use-model-hook"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import axios from "axios"
import { useState } from "react"
import { UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"


const SettingsModel = () => {
  const model = UseModel()
  const router = useRouter()
const [google,setGoogle] =  useState(false)
  const isVisible = model.isOpen && model.label === "settings"
  const handleClose = () => {
    
    model.onClose();
  }


const formSchema = z.object({
  firstName : z.string().min(0),
  lastName : z.string().min(0),
})

const form = useForm<z.infer <typeof formSchema>>({
  resolver:zodResolver(formSchema),
  defaultValues:{
    firstName : "",
    lastName : ""
  }
})



const onSubmit =async (values: z.infer<typeof formSchema>)=>{
  try{
    const response = await axios.patch("/api/user",{values ,google})
// console.log(values,google)
form.reset();
router.refresh();
model.onClose()
window.location.reload()
  }catch(err){
    console.log(err)
  }
  
}

const isLoading = form.formState.isSubmitting
  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
       <DialogContent>
    <DialogHeader>
      <DialogTitle>Settings</DialogTitle>

    <DialogDescription>Update your profile , change your name or choose it from google.</DialogDescription>
    </DialogHeader>
    <div className="w-full p-4 flex items-center justify-center"><UserButton   appearance={{
            elements: {
              avatarBox: "h-[100px] w-[100px]"
            }
          }}  afterSignOutUrl="/"/></div>
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} >
        <div className="space-y-4">
        <FormField 
        
        control={form.control}
        name = "firstName"
        render = {({field})=>(
          <FormItem>
            <Label>Edit your First Name</Label>
            <FormControl>
              <Input  className="bg-zinc-300/50  dark:bg-muted dark:text-white   border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "    disabled={isLoading}  placeholder="Enter your first name" {...field}  />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />
             <FormField 
        control={form.control}
        name = "lastName"
        render = {({field})=>(
          <FormItem>
            <Label>Edit your Last Name</Label>
            <FormControl>
              <Input  className="bg-zinc-300/50  dark:bg-muted dark:text-white   border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "  disabled={isLoading} placeholder="Enter your last name" {...field}  />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />
        </div>
        <DialogFooter className="flex  items-center justify-between gap-3  pt-8">
        <Button disabled={isLoading}  type="submit"   className="bg-indigo-500 w-full  hover:bg-indigo-400">Save</Button>
          <Button disabled={isLoading} type="submit"   onClick={()=>setGoogle(true)}  variant="outline" className="w-full">Choose from google</Button>

        </DialogFooter>
      </form>
    </Form>
  </DialogContent>
    </Dialog>
  )
}

export default SettingsModel