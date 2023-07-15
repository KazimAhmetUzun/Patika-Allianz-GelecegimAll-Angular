import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userModel: User = {
    userId: 0,
    username: '',
    email: '',
    creationDate: '',
    isActive: false
  };

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('userId'));
      if (userId) {
        this.userService.getUsers().subscribe((users: User[]) => {
          const user = users.find(u => u.userId === userId);
          if (user) {
            this.userModel = { ...user };
          }
        });
      }
    });
  }

  saveUser(): void {
    if (this.userModel.username && this.userModel.email) {
      if (this.userModel.userId !== 0) {
        // Edit user
        this.userService.editUser(this.userModel);
      } else {
        // Add new user
        const newUser: User = {
          userId: 0,
          username: this.userModel.username,
          email: this.userModel.email,
          creationDate: new Date().toISOString(),
          isActive: true
        };
        this.userService.addUser(newUser);
      }
      this.router.navigate(['/users']);
    }
  }
}
