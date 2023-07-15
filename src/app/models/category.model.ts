import { Post } from './post.model';

export interface Category {
  categoryId: number;
  name: string;
  creationDate: string;
  posts: Post[];
  postCount?: number;
  filtered?: boolean;
}
