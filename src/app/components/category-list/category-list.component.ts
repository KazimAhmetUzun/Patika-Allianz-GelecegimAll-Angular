import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  currentPage: number = 1;
  pageSize: number = 15;
  totalCategories: number = 0;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.totalCategories = categories.length;
      this.categories = categories.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    });
  }

  addNewCategory(newCategoryName: string): void {
    const newCategory: Category = {
      categoryId: this.generateCategoryId(),
      name: newCategoryName,
      creationDate: this.getCurrentDate(),
      posts: []
    };
    this.categoryService.addCategory(newCategory).subscribe(() => {
      this.loadCategories();
    });
  }

  editCategory(category: Category): void {
    const newName = prompt('Enter the new name for the category:', category.name);
    if (newName) {
      category.name = newName;
      this.categoryService.updateCategory(category).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  goToNextPage(): void {
    const totalPages = Math.ceil(this.totalCategories / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.loadCategories();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCategories();
    }
  }

  private generateCategoryId(): number {
    return this.categories.length + 1;
  }

  private getCurrentDate(): string {
    const now = new Date();
    return now.toISOString();
  }
}
