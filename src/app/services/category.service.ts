import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { CATEGORIES } from '../data/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  getCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }

  addCategory(category: Category): Observable<boolean> {
    const newId = CATEGORIES.length + 1;
    category.categoryId = newId;
    CATEGORIES.push(category);
    return of(true);
  }

  getCategory(id: number): Observable<Category | undefined> {
    const category = CATEGORIES.find(c => c.categoryId === id);
    return of(category);
  }

  updateCategory(category: Category): Observable<boolean> {
    const index = CATEGORIES.findIndex(c => c.categoryId === category.categoryId);
    if (index !== -1) {
      CATEGORIES[index] = category;
      return of(true);
    }
    return of(false);
  }
}
