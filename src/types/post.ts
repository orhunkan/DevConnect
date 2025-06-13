import { Types } from "mongoose";

export interface BlogPost {
  _id: Types.ObjectId | string;
  authorEmail: string;
  title: string;
  content: string;
  tags: string[];
  likes?: string[]
  createdAt: Date;
  updatedAt: Date;
}
