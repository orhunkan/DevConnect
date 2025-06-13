import mongoose, { Schema, Document } from "mongoose";

// 👇 Buraya type'ı ekliyoruz
export interface UserType extends Document {
  email: string;
  name: string;
  image?: string;
  bio?: string;
  githubUsername?: string;
  skills?: string[];
}

const UserSchema: Schema = new mongoose.Schema(
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

// DEV ortamı için hot-reload önlemi
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.models.User || mongoose.model<UserType>("User", UserSchema);

export default User;
