import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Category } from '../../models/category.model';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: Post = {
    postId: 0,
    userId: 0,
    categoryId: 0,
    title: '',
    content: '',
    viewCount: 0,
    creationDate: '',
    isPublished: false
  };

  categories: Category[] = [];

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  addPost(): void {
    if (this.post.title && this.post.content && this.post.categoryId) {
      this.postService.addPost(this.post);
      this.resetForm();
    } else {
      alert('Lütfen tüm alanları doldurun.');
    }
  }

  resetForm(): void {
    this.post = {
      postId: 0,
      userId: 0,
      categoryId: 0,
      title: '',
      content: '',
      viewCount: 0,
      creationDate: '',
      isPublished: false
    };
  }
}
