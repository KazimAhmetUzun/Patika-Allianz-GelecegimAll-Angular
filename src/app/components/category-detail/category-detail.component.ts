import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  category: Category | undefined;
  postCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = +params['id'];
      this.loadCategoryDetails(categoryId);
      this.loadPostCount(categoryId);
    });
  }

  loadCategoryDetails(categoryId: number): void {
    this.categoryService.getCategory(categoryId).subscribe(category => {
      this.category = category;
    });
  }

  loadPostCount(categoryId: number): void {
    this.postService.getPostsByCategory(categoryId).subscribe((posts: Post[]) => {
      this.postCount = posts.length;
    });
  }

  goToPostList(categoryId: number): void {
    this.router.navigate(['/posts'], { queryParams: { categoryId: categoryId } });
  }
}
