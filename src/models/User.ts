import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: String,
    image: String,
    bio: String,
    githubUsername: String,
    skills: [String],
  },
  { timestamps: true }
);

// DEV ortamında schema cache bug'ını önlemek için:
if (mongoose.models.User) {
  delete mongoose.models.User;
}

export default mongoose.models.User || mongoose.model("User", UserSchema);
