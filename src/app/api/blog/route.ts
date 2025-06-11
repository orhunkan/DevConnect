import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDB();
  const body = await req.json();
  console.log("📦 Gelen veri:", body); // 👈 bunu yazdır

  try {
    const newPost = await Post.create(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error("Blog ekleme hatası:", err);
    return NextResponse.json({ message: "Hata var" }, { status: 500 });
  }
}
