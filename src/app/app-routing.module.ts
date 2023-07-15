import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserAddComponent },
  { path: 'users/:userId/edit', component: UserFormComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/add', component: PostFormComponent },
  { path: 'posts/:postId/edit', component: PostFormComponent },
  { path: 'posts/:postId', component: PostDetailComponent }, 
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/add', component: CategoryFormComponent },
  { path: 'categories/:categoryId/edit', component: CategoryFormComponent },
  { path: 'categories/:categoryId', component: CategoryDetailComponent },
  { path: 'comments', component: CommentListComponent },
  { path: 'comments/add', component: AddCommentComponent },
  { path: 'comments/:commentId/edit', component: CommentFormComponent },
  { path: 'comments/:commentId', component: CommentDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
