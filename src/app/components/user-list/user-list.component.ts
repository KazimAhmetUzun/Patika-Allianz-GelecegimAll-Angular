import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 27;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  editUser(user: User): void {
    this.router.navigate(['/users', user.userId, 'edit']);
  }

  deleteUser(user: User): void {
    if (this.users.length === 1) {
      alert('Cannot delete the only user!');
      return;
    }
    this.userService.deleteUser(user);
    this.users = this.users.filter(u => u.userId !== user.userId);
  }

  goToAddUser(): void {
    this.router.navigate(['users', 'add']);
  }

  getUsersForPage(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  changePage(pageOffset: number): void {
    const newPage = this.currentPage + pageOffset;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }
}
