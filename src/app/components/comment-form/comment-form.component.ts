import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  comment: Comment = {
    commentId: 0,
    postId: 0,
    userId: 0,
    comment: '',
    creationDate: '',
    isConfirmed: false
  };

  constructor(private commentService: CommentService, private router: Router) {}

  ngOnInit(): void {}

  addComment(): void {
    this.comment.creationDate = new Date().toISOString();
    this.commentService.addComment(this.comment);
    this.resetForm();
    this.router.navigate(['/comment-list']);
  }

  resetForm(): void {
    this.comment = {
      commentId: 0,
      postId: 0,
      userId: 0,
      comment: '',
      creationDate: '',
      isConfirmed: false
    };
  }
}
