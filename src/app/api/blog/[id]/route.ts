import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

async function updatePost(
  req: NextRequest,
  params: { id: string }
): Promise<NextResponse> {
  await connectToDB();

  const { title, content, tags } = await req.json();

  try {
    const updated = await Post.findByIdAndUpdate(
      params.id,
      {
        title,
        content,
        tags,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("Blog güncelleme hatası:", err);
    return NextResponse.json({ message: "Güncelleme hatası" }, { status: 500 });
  }
}

/* ----------------------------- UPDATE ----------------------------- */
// PUT → tam güncelleme
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return updatePost(req, context.params);
}

// PATCH → kısmi güncelleme 
export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return updatePost(req, context.params);
}

/* ----------------------------- DELETE ----------------------------- */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  try {
    await Post.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Blog silindi" }, { status: 200 });
  } catch (err) {
    console.error("Blog silme hatası:", err);
    return NextResponse.json({ message: "Silme hatası" }, { status: 500 });
  }
}
