import { z } from "zod";

export const createCardFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  steps: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required."),
        image: z.string().min(1, "Image is required."),
        yesText: z.string().min(1, "Yes text is required."),
        noText: z.string().min(1, "No text is required."),
      })
    )
    .min(1, "At least one question is required.")
    .max(10, "Maximum 10 questions allowed."),
});

export type CreateCardFormValues = z.infer<typeof createCardFormSchema>;
