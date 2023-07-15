import { Component } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
  newComment: Comment = {
    commentId: 0,
    postId: 0,
    userId: 0,
    comment: '',
    creationDate: '',
    isConfirmed: false
  };

  constructor(private commentService: CommentService, private router: Router) {}

  addComment(): void {
    const commentValue = this.newComment.comment;
    const newComment: Comment = {
      ...this.newComment,
      comment: commentValue,
      creationDate: new Date().toISOString()
    };
    this.commentService.addComment(newComment);
    this.resetForm();
    this.router.navigate(['/comments/add']);
  }

  resetForm(): void {
    this.newComment.comment = '';
  }
}
