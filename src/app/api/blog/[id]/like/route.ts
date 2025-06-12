import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email!;
  await connectToDB();

  const post = await Post.findById(params.id);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Eğer likes dizisi tanımsızsa boş bir dizi olarak başlat
  if (!Array.isArray(post.likes)) {
    post.likes = [];
  }

  const alreadyLiked = post.likes.includes(userEmail);

  if (alreadyLiked) {
    post.likes = post.likes.filter((email: string) => email !== userEmail);
    console.log(`Removed like from: ${userEmail}`);
  } else {
    post.likes.push(userEmail);
    console.log(`Added like from: ${userEmail}`);
  }

  await post.save();

  console.log("Updated likes:", post.likes);

  return NextResponse.json({
    likes: post.likes.length,
    liked: !alreadyLiked,
  });
}
