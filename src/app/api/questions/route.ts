import { createAdminClient } from "@/utils/supabase/server-admin";
import { NextResponse } from "next/server";
import {
  createCardFormSchema,
  CreateCardFormValues,
} from "@/app/(create)/create/components/create-card-form-schema";

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body: CreateCardFormValues = await request.json();

    const parsedBody = createCardFormSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsedBody.error },
        { status: 400 }
      );
    }

    const slug = Math.random().toString(36).substring(2, 10);

    const { data, error } = await supabase
      .from("cards")
      .insert([
        {
          questions: parsedBody.data.steps,
          created_at: new Date().toISOString(),
          email: parsedBody.data.email,
          name: parsedBody.data.name,
          slug: slug,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create valentine card" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Valentine card created successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error creating valentine card:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
