import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post.model';
import { POSTS } from '../data/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Post[] = POSTS;

  constructor() {}

  getPosts(): Observable<Post[]> {
    return of(this.posts);
  }

  getPost(id: number): Observable<Post | undefined> {
    const post = this.posts.find(p => p.postId === id);
    return of(post);
  }

  addPost(post: Post): void {
    this.posts.push(post);
  }

  deletePost(id: number): void {
    const index = this.posts.findIndex(p => p.postId === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
    }
  }

  updatePost(post: Post): void {
    const index = this.posts.findIndex(p => p.postId === post.postId);
    if (index !== -1) {
      this.posts[index] = post;
    }
  }

  getPostsByCategory(categoryId: number): Observable<Post[]> {
    const filteredPosts = this.posts.filter(p => p.categoryId === categoryId);
    return of(filteredPosts);
  }
}
