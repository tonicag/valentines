"use client";

import QuestionsForm from "@/app/(create)/create/components/questions-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  steps: z.array(
    z.object({
      question: z.string().min(1),
      image: z.string().min(1),
      yesText: z.string().min(1).default("Yes"),
      noText: z.string().min(1).default("No"),
    })
  ),
});

export default function CreateCardForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      steps: [
        {
          question: "Would you be my valentine?",
          image: "https://i.giphy.com/XxEy4h6YxKE2H5TZ1x.webp",
          yesText: "Yes",
          noText: "No",
        },
      ],
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    console.log(values);
  }, []);

  return (
    <Form {...form}>
      <form
        className="w-full sm:max-w-2xl pb-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="text-lg font-semibold my-4 w-full border-b-2 border-pink-500">
          General information
        </p>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Love</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                The person you're creating the card for. ❤️
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <QuestionsForm />
        <Button variant={"default"} type="submit" className="w-full mt-4">
          Create card
        </Button>
      </form>
    </Form>
  );
}
