import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { CommentService } from '../../services/comment.service';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { Category } from '../../models/category.model';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postId!: number;
  post!: Post;
  user!: User;
  category!: Category;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private categoryService: CategoryService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.loadPostDetails();
    });
  }

  loadPostDetails(): void {
    this.postService.getPost(this.postId).subscribe(post => {
      if (post) {
        this.post = post;
        this.loadUserDetails(post.userId);
        this.loadCategoryDetails(post.categoryId);
        this.loadComments(post.postId);
      }
    });
  }

  loadUserDetails(userId: number): void {
    this.userService.getUsers().subscribe(users => {
      const user = users.find(u => u.userId === userId);
      if (user) {
        this.user = user;
      }
    });
  }

  loadCategoryDetails(categoryId: number): void {
    this.categoryService.getCategories().subscribe(categories => {
      const category = categories.find(c => c.categoryId === categoryId);
      if (category) {
        this.category = category;
      }
    });
  }

  loadComments(postId: number): void {
    this.commentService.getCommentsByPostId(postId).subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }
}
