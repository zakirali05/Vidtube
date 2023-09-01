"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {SearchIcon} from "lucide-react"


const Search = () => {
  const formSchema = z.object({
    serachTerm: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serachTerm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting
  return (
    
    <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="border rounded-md  hidden  md:flex items-center justify-between w-[40%]">
<FormField

control={form.control}
name = 'serachTerm'
render={({field})=>(
    <FormItem>
        <FormControl>
                <Input  disabled={isLoading}   placeholder="Search" {...field} className="border-0" />
              </FormControl>
            
    </FormItem>
)}

 />
 <Button disabled={isLoading}    type="submit" variant="outline" className="border-0 rounded-none border-l" ><SearchIcon className="w-5 h-5 font-medium"/></Button>
        </form>
    </Form>
    
  );
};

export default Search;
