import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from '../models/comment.model';
import { COMMENTS } from '../data/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor() { }

  getComments(): Observable<Comment[]> {
    return of(COMMENTS);
  }

  addComment(comment: Comment): void {
    COMMENTS.push(comment);
  }

  getCommentsByPostId(postId?: number): Observable<Comment[]> {
    if (postId) {
      const comments = COMMENTS.filter(comment => comment.postId === postId);
      return of(comments);
    } else {
      return of(COMMENTS);
    }
  }
  
  getCommentById(commentId: number): Observable<Comment | undefined> {
    const comment = COMMENTS.find(comment => comment.commentId === commentId);
    return of(comment);
  }
}
