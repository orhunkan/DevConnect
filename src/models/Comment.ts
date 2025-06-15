import { Schema, model, models, deleteModel } from "mongoose";

if (models.Comment) {
  deleteModel("Comment");
}

const CommentSchema = new Schema(
  {
    postId: { type: String, required: true },   
    authorEmail: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);
export default Comment;
