import { Schema, model, models, deleteModel } from "mongoose";

if (models.Post) {
  deleteModel("Post");
}

const PostSchema = new Schema({
  authorEmail: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String, required: true }],
  likes: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

const Post = model("Post", PostSchema);
export default Post;
