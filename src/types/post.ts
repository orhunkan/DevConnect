export interface BlogPost {
  _id :string;
  authorEmail: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
