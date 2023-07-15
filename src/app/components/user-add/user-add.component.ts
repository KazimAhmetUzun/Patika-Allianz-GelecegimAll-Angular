import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  user: User = {
    userId: 0,
    username: '',
    email: '',
    creationDate: '',
    isActive: true
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser(): void {
    this.user.userId = this.generateUserId();
    this.user.creationDate = new Date().toISOString();
    this.userService.addUser(this.user);
    this.router.navigate(['/users']);
  }

  private generateUserId(): number {
    return Math.floor(Math.random() * (5000 - 1500 + 1)) + 1500;
  }
}
