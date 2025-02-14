import { createAdminClient } from "@/utils/supabase/server-admin";
import { notFound } from "next/navigation";
import Question from "@/app/(homepage)/components/question";
import { QuestionStep } from "@/types/forms";
import { Metadata } from "next";

type Card = {
  id: number;
  created_at: string;
  email: string | null;
  name: string | null;
  questions: QuestionStep[];
  slug: string | null;
};

export const revalidate = 0;

async function getCard(slug: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching card:", error);
    return null;
  }

  return data as Card;
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const card = await getCard(slug);

  if (!card) {
    return {
      title: "Valentine Card Not Found 💔",
      description: "This valentine card doesn't exist. Create your own!",
    };
  }

  return {
    title: `Valentine Card for ${card.name || "Someone Special"} 💝`,
    description:
      card.questions[0]?.question || "A special Valentine's card just for you!",
    openGraph: {
      images: [
        card.questions[0]?.image ||
          "https://i.giphy.com/XxEy4h6YxKE2H5TZ1x.webp",
      ],
    },
  };
}

export default async function CardPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const card = await getCard(slug);

  if (!card) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-pink-100 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <Question
          finalStep={{
            question: `${card.name} said YES! 😍😍😍`,
            image: "https://i.giphy.com/lck9f0L8jPjRtkigYy.webp",
          }}
          steps={card.questions}
        />
      </div>
    </div>
  );
}
