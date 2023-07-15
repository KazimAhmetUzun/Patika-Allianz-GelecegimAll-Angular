import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category: Category = {
    categoryId: 0,
    name: '',
    creationDate: '',
    posts: []
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  addCategory(): void {
    this.categoryService.addCategory(this.category).subscribe(() => {
      this.resetForm();
    });
  }

  resetForm(): void {
    this.category = {
      categoryId: 0,
      name: '',
      creationDate: '',
      posts: []
    };
  }
}
