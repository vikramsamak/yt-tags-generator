"use client";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
});

function TagSearch() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onErrors(errors: FieldErrors<z.infer<typeof formSchema>>) {
    toast.error(errors.title?.message);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onErrors)}
        className="flex flex-col gap-2 w-full items-center justify-center"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full md:w-1/2 p-6">
              <FormControl className="p-6">
                <Input
                  placeholder="Enter your next youtube video title to generate tags"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="inline-flex gap-2 w-full md:w-48">
          <Search className="h-4 w-5" />
          Search
        </Button>
      </form>
    </Form>
  );
}

export default TagSearch;
