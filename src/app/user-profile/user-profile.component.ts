import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { User } from '../shared/user.model'
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails: User;
  adminOrNot: boolean;
  constructor(private userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userService.isAdmin(this.userDetails.admin);
        this.adminOrNot=this.userService.getAdmin();
      },
      err => {
        console.log(err);
      }
    );
  }
  
  onEmpSearch(){
    this.router.navigate(['/employeeprofile']);
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
