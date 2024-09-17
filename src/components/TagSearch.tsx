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
import { Copy } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { ApiResponseHandler } from "@/helpers/ApiResponseHandler";
import { Skeleton } from "./ui/skeleton";

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

  const { isPending, mutate } = useMutation({
    mutationFn: (title: string) => ApiResponseHandler(title),
    onSuccess: (data) => {
      setTags(data);
    },
    onError: (error) => {
      console.error("Error while fetching data:", error.message);
      toast.error(error.message);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title } = values;
    mutate(title);
  }

  function onErrors(errors: FieldErrors<z.infer<typeof formSchema>>) {
    toast.error(errors.title?.message);
  }

  async function copyHandler() {
    const tagsString = tags.join(", ");
    try {
      await navigator.clipboard.writeText(tagsString);
      toast.success("Tags copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy tags: ", error);
    }
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onErrors)}
          className="flex flex-col gap-4 w-full items-center justify-center"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
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
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        {isPending ? (
          <Skeleton className="h-48 md:w-1/2" />
        ) : (
          tags &&
          tags.length > 0 && (
            <>
              <TagsInput
                className="w-full md:w-1/2 p-6"
                value={tags}
                onValueChange={setTags}
              />
              <Button
                type="button"
                className="inline-flex gap-2 w-full md:w-48 tracking-wider"
                onClick={copyHandler}
              >
                Copy
                <Copy className="h-4 w-4" />
              </Button>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default TagSearch;
