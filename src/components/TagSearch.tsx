"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { toast } from "sonner";
import { useState } from "react";
import { TagsInput } from "./extension/tags-input";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
});

function TagSearch() {
  const [tags, setTags] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title } = values;
    const response = await fetch("/api/generatetag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    const tags = await response.json();
    if (tags && tags.length > 0) {
      setTags(tags);
      console.log(response.json());
    }
  }

  function onErrors(errors: FieldErrors<z.infer<typeof formSchema>>) {
    toast.error(errors.title?.message);
  }

  return (
    <div className="w-full flex flex-col gap-2 justify-center">
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
          <Button
            type="submit"
            className="inline-flex gap-2 w-full md:w-48 tracking-wider"
          >
            Generate
          </Button>
        </form>
      </Form>
      <TagsInput
        className="w-full md:w-full p-6 justify-center"
        value={tags}
        onValueChange={setTags}
      />
    </div>
  );
}

export default TagSearch;
