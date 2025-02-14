import { Metadata } from "next";
import CreateCardForm from "@/app/(create)/create/components/create-card-form";

export const metadata: Metadata = {
  title: "Create Your Valentine Card 💌",
  description:
    "Create a special Valentine's card with custom questions and GIFs for your loved one.",
  openGraph: {
    title: "Create Your Valentine Card 💌",
    description:
      "Create a special Valentine's card with custom questions and GIFs for your loved one.",
    images: [
      {
        url: "https://i.giphy.com/XxEy4h6YxKE2H5TZ1x.webp",
        width: 1200,
        height: 630,
        alt: "Create Valentine Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your Valentine Card 💌",
    description:
      "Create a special Valentine's card with custom questions and GIFs for your loved one.",
    images: ["https://i.giphy.com/XxEy4h6YxKE2H5TZ1x.webp"],
  },
};

export default function CreatePage() {
  return (
    <div className="min-h-screen flex flex-col items-center p-2 sm:p-0 z-10">
      <h1 className="text-2xl md:text-4xl font-bold mt-20 mb-10 text-center">
        Enter the details to create your{" "}
        <span className="text-pink-700">card!</span> ❤️
      </h1>
      <CreateCardForm />
    </div>
  );
}
