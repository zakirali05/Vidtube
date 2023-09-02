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
import { usePathname, useRouter } from "next/navigation";
import Loader from "../loader";
import { Textarea } from "../ui/textarea";
import { Upload } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";

const UploadVideo = () => {
  const router = useRouter()
  const formSchema = z.object({
   videoLink  : z.string().min(1,{message:"Upload a video"}),
   thumbnailLink : z.string().min(1 , {message:"Upload a thumbail"}),
   title : z.string().min(50,{message:"Enter title of atleast 50 characters"}),
   description : z.string().min(50,{message:"Enter title of atleast 50 characters"}),
   keyword : z.string().min(4,{message:"Keyword should be greater than 4 characters"}),
   premiumVideo : z.boolean()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     videoLink:"",
     thumbnailLink:"",
     title:"",
     description:"",
     keyword : "",
     premiumVideo:false,
    },
  });

  const model = UseModel();
const path = usePathname()
const url = path.split("/")[2]
  const isVisible = model.isOpen && model.label === "uploadVideo";
  const handleClose = () => {
    model.onClose();
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try{
    const response = await axios.post("/api/video",{values,url})
    console.log(response)
    form.reset();
    router.refresh();
   model.onClose()
   window.location.reload()
  }
  catch(err){
    console.log(err , "[Upload_Video_ERR]")
  }
  };

  const isLoading = form.formState.isSubmitting
  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-emerald-500 font-semibold">
            Upload Video
          </DialogTitle>
          <DialogDescription>
            Upload your video and let the world discover it.
          </DialogDescription>
          <ScrollArea className="h-[400px] px-5 mt-4">
          <Form {...form}>
            <form    onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="flex items-center justify-center text-center pt-4 ">
               
                <FormField
                  control={form.control}
                  name="videoLink"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="uppercase">Upload Video</Label>
                      <FormControl  >
                        <FileUpload
                          endpoint="videoLink"
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
                name="title"
                render={({field}) => (
                  <FormItem>
                    <Label>Title</Label>
                    <FormControl>
                      <Input
                      disabled={isLoading}
                        placeholder="Enter videos's title"
                        className="bg-zinc-300/50  dark:bg-muted dark:text-white   border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <Label>Description</Label>
                    <FormControl>
                      <Textarea
                      disabled={isLoading}
                        placeholder="Enter videos's description"
                        className="bg-zinc-300/50  dark:bg-muted dark:text-white   border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
                <FormField
                  control={form.control}
                  name="thumbnailLink"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="uppercase ">Upload Thumbnail</Label>
                      <FormControl >
                        <FileUpload
                        
                          endpoint="thumbnailLink"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                  <FormField
                control={form.control}
                name="keyword"
                render={({field}) => (
                  <FormItem>
                    <Label>Keyword</Label>
                    <FormControl>
                      <Input
                      disabled={isLoading}
                        placeholder="Enter videos's keyword"
                        className="bg-zinc-300/50  dark:bg-muted dark:text-white   border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />  <FormField
              control={form.control}
              name="premiumVideo"
              render={({field}) => (
                <FormItem>
                
                  <FormControl className="pt-5">
                  <div className="flex items-center space-x-2">
      <Switch id="premium" checked={field.value}
                      onCheckedChange={field.onChange} />
      <Label htmlFor="premium" className="uppercase pl-1">Premium Video?</Label>
    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
              <DialogFooter className="mt-5 ">
                {" "}
                <Button   disabled={isLoading}  type="submit"   className="bg-indigo-500 hover:bg-indigo-400 dark:text-white m-5">
                  {isLoading ?<Loader color="white"  size={5}/>  : <p className="flex items-center">Upload <Upload className="pl-2 w-6 h-6"/></p>} 
                 
                </Button>
              </DialogFooter>
            </form>
          </Form>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadVideo;
