import { connectToDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
 import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/* GET → yorumları çek */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const comments = await Comment.find({ postId: params.id })
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json(comments, { status: 200 });
}

/* POST → yeni yorum */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { content } = await req.json();
  if (!content) {
    return NextResponse.json({ message: "Boş yorum" }, { status: 400 });
  }

  await connectToDB();
  const newComment = await Comment.create({
    postId: params.id,
    authorEmail: session.user.email,
    content,
  });

  return NextResponse.json(newComment, { status: 201 });
}
