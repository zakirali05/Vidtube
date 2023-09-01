"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"
import UseModel from "@/hooks/use-model-hook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import FileUpload from "../file-upload";
import { useRouter } from "next/navigation";
import Loader from "../loader";

const CreateChannel = () => {
  const router = useRouter()
  const formSchema = z.object({
    channelImg: z.string().min(1,{message:"Profile image is required"}),
    name: z.string().min(3,{message:"Name should contain more than 3 characters"}),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channelImg: "",
      name: "",
    },
  });

  const model = UseModel();

  const isVisible = model.isOpen && model.label === "createChannel";
  const handleClose = () => {
    model.onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try{
    const response = await axios.post("/api/channel",values)
    console.log(response)
    form.reset();
    router.refresh();
   model.onClose()
   window.location.reload()
  }
  catch(err){
    console.log(err , "[CREATE_CHANNEL_ERROR]")
  }
  };

  const isLoading = form.formState.isSubmitting
  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-emerald-500 font-semibold">
            Create Channel
          </DialogTitle>
          <DialogDescription>
            Create your very own vidtube channel and grow your personal brand.
          </DialogDescription>
          <Form {...form}>
            <form    onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center justify-center text-center pt-4">
                <FormField
                  control={form.control}
                  name="channelImg"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                        
                          endpoint="channelImg"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <Label>Name</Label>
                    <FormControl>
                      <Input
                      disabled={isLoading}
                        placeholder="Enter channel's name"
                        className="bg-zinc-300/50  dark:bg-muted dark:text-white   border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                {" "}
                <Button   disabled={isLoading}  type="submit"   className="bg-indigo-500 hover:bg-indigo-400 dark:text-white">
                  {isLoading ?<Loader color="white"  size={5}/>  : <p>Create</p>} 
                 
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannel;
