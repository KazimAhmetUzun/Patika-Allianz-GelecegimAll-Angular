import { Post } from "./post.model";

export interface User {
  userId: number;
  username: string;
  email: string;
  creationDate: string;
  isActive: boolean;
  comments?: Comment[];
  posts?: Post[];
}
