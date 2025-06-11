'use server';

import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { redirect } from "next/navigation";

export async function deletePost(id: string) {
  await connectToDB();
  await Post.findByIdAndDelete(id);
  redirect("/blog"); // silindikten sonra blog listesine dön
}
