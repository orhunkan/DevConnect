export interface BlogPost {
  _id?:string;// made change here
  authorEmail: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}