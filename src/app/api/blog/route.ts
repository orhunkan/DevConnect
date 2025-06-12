// src/app/api/blog/route.ts
import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, content, tags } = body;

  await connectToDB();

  try {
    const newPost = await Post.create({
      title,
      content,
      tags,
      authorEmail: session.user.email,
      likes: [], // default
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error("Yeni post hatası:", err);
    return NextResponse.json({ message: "Bir hata oluştu" }, { status: 500 });
  }
}
