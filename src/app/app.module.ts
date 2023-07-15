import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // RouterModule ekle

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';
import { UserAddComponent } from './components/user-add/user-add.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    PostListComponent,
    PostFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
    CommentListComponent,
    CommentFormComponent,
    PostDetailComponent,
    CategoryDetailComponent,
    AddCommentComponent,
    CommentDetailComponent,
    UserAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
