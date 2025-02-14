"use client";

import {
  createCardFormSchema,
  CreateCardFormValues,
} from "@/app/(create)/create/components/create-card-form-schema";
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
import ShareCardDialog from "@/components/ui/share-card-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function CreateCardForm() {
  const router = useRouter();
  const [cardUrl, setCardUrl] = useState<string | null>(null);

  const form = useForm<CreateCardFormValues>({
    resolver: zodResolver(createCardFormSchema),
    defaultValues: {
      name: "",
      email: "",
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

  const onSubmit = useCallback(async (values: CreateCardFormValues) => {
    try {
      const response = await axios.post("/api/questions", values);
      const slug = response.data?.data?.slug;

      if (slug) {
        const url = `${window.location.origin}/card/${slug}`;
        setCardUrl(url);
      } else {
        throw new Error("No slug returned from API");
      }
    } catch (error) {
      console.error("Error creating valentine card:", error);
      // You might want to add toast notification here for error handling
    }
  }, []);

  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      <Form {...form}>
        <form
          className="w-full sm:max-w-2xl pb-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="text-lg font-semibold my-4 w-full border-b-2 border-pink-500">
            General information
          </p>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Love</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>
                  The person you&apos;re creating the card for. ❤️
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormDescription>Your email address. ❤️</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <QuestionsForm />
          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting ? "Creating card..." : "Create card"}
          </Button>
        </form>
      </Form>

      {cardUrl && (
        <ShareCardDialog
          cardUrl={cardUrl}
          onClose={() => {
            setCardUrl(null);
            router.push(cardUrl);
          }}
        />
      )}
    </>
  );
}
