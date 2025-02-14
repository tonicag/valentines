import { createAdminClient } from "@/utils/supabase/server-admin";
import { notFound } from "next/navigation";
import Question from "@/app/(homepage)/components/question";
import { QuestionStep } from "@/types/forms";

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
  console.log("data", { error, slug });
  if (error || !data) {
    console.error("Error fetching card:", error);
    return null;
  }

  return data as Card;
}

export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = await getCard(id);

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
