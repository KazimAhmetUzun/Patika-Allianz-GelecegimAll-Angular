import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: Comment[] = [];
  currentPage: number = 1;
  pageSize: number = 15;
  totalComments: number = 0;
  postIdFilter: number | null = null;

  constructor(private commentService: CommentService, private router: Router) { }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    const postIdFilter = this.postIdFilter !== null ? this.postIdFilter : undefined;
    this.commentService.getCommentsByPostId(postIdFilter).subscribe((comments: Comment[]) => {
      this.totalComments = comments.length;
      this.comments = comments.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    });
  }

  goToAddComment(): void {
    this.router.navigate(['/comments/add']);
  }

  goToCommentDetail(comment: Comment): void {
    this.router.navigate(['/comments', comment.commentId]);
  }

  goToNextPage(): void {
    const totalPages = Math.ceil(this.totalComments / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.loadComments();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadComments();
    }
  }

  filterCommentsByPostId(postId: number | null): void {
    this.postIdFilter = postId;
    this.currentPage = 1;
    this.loadComments();
  }

  clearPostIdFilter(): void {
    this.postIdFilter = null;
    this.currentPage = 1;
    this.loadComments();
  }
}
