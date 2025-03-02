import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
//import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule]
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];

  //constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.userService.getUsers().subscribe((data) => {
    //   this.users = data;
    // });
  }

  deleteUser(userId: number) {
  //   if (confirm('Are you sure you want to delete this user?')) {
  //     this.userService.deleteUser(userId).subscribe(() => {
  //       this.users = this.users.filter(user => user.id !== userId);
  //     });
  //   }
   }
}
