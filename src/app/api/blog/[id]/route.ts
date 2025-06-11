import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

// GÜNCELLEME (PATCH)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDB();
  const body = await req.json();

  try {
    const updated = await Post.findByIdAndUpdate(
      params.id,
      {
        $set: {
          title: body.title,
          content: body.content,
          tags: body.tags,
        },
      },
      { new: true }
    );

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("Blog güncelleme hatası:", err);
    return NextResponse.json({ message: "Hata oluştu" }, { status: 500 });
  }
}

// SİLME (DELETE)
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDB();

  try {
    await Post.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Blog silindi" }, { status: 200 });
  } catch (err) {
    console.error("Blog silme hatası:", err);
    return NextResponse.json({ message: "Silme hatası" }, { status: 500 });
  }
}
