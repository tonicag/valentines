"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GifPicker from "@/components/ui/gif-picker";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function QuestionsForm() {
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const onAddQuestion = async () => {
    const valid = await form.trigger("steps", { shouldFocus: true });
    if (valid) {
      append({ question: "", yesText: "", noText: "", image: "" });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => (
        <div key={field.id} className="border-b-3 border-pink-400 pb-4">
          <div className="text-lg font-semibold my-4 w-full border-b-2 border-pink-500 flex items-center justify-between">
            <span className="text-pink-500">Question {index + 1}</span>
            {fields.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => remove(index)}
                className="p-0"
              >
                <Trash
                  width={20}
                  height={20}
                  className="stroke-[2px] flex-shrink-0 text-red-500"
                />
              </Button>
            )}
          </div>
          <FormField
            control={form.control}
            name={`steps.${index}.question`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Question" {...field} />
                </FormControl>
                <FormDescription>
                  The question you want to ask your valentine.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 w-full">
            <FormField
              control={form.control}
              name={`steps.${index}.yesText`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Yes text</FormLabel>
                  <FormControl>
                    <Input placeholder="Yes button text" {...field} />
                  </FormControl>
                  <FormDescription>
                    The text you want to display when the user clicks
                    &quot;Yes&quot;.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`steps.${index}.noText`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>No text</FormLabel>
                  <FormControl>
                    <Input placeholder="No button text" {...field} />
                  </FormControl>
                  <FormDescription>
                    The text you want to display when the user clicks
                    &quot;No&quot;.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={`steps.${index}.image`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <GifPicker
                  label="Pick a gif for this question"
                  className="mx-auto mt-4"
                  onGifClick={(gif, e) => {
                    e.preventDefault();
                    field.onChange(gif.images.original.url);
                  }}
                  value={field.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      {fields.length < 10 && (
        <Button
          type="button"
          onClick={onAddQuestion}
          variant="outline"
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>Add question</span>
        </Button>
      )}
    </div>
  );
}
