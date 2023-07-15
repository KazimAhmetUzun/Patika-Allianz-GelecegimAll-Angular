import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { USERS } from '../data/users';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PostService } from './post.service';
import { CommentService } from './comment.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = USERS;

  constructor(
    private router: Router,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  editUser(user: User): void {
    const index = this.users.findIndex(u => u.userId === user.userId);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  deleteUser(user: User): void {
    this.postService.getPosts().subscribe(posts => {
      const hasUserPosts = posts.some(post => post.userId === user.userId);
      this.commentService.getComments().subscribe(comments => {
        const hasUserComments = comments.some(comment => comment.userId === user.userId);

        if (hasUserPosts || hasUserComments) {
          alert('Bu kullanıcıya ait gönderi veya yorum olduğu için silme işlemi yapılamaz!');
          return;
        }

        if (this.users.length === 1) {
          alert('Sadece bir kullanıcı kaldığı için silme işlemi yapılamaz!');
          return;
        }

        const index = this.users.findIndex(u => u.userId === user.userId);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      });
    });
  }
}
