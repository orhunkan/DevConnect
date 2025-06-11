import { Schema, models, model } from "mongoose";
import type { BlogPost } from "@/types/post";

const PostSchema = new Schema<BlogPost>(
  {
    _id: { type: String, required: true },
    authorEmail: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String, required: true }],
  },
  { timestamps: true }
);


const Post = models.Post || model<BlogPost>("Post", PostSchema);
export default Post;
