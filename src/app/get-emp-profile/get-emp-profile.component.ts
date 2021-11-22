import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-get-emp-profile',
  templateUrl: './get-emp-profile.component.html',
  styleUrls: ['./get-emp-profile.component.css']
})
export class GetEmpProfileComponent implements OnInit {
  showDeleteMessage: boolean;
  users: any = [];
  adminOrNot: boolean;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.adminOrNot=this.userService.getAdmin();
    this.userService.getUsers().subscribe(
    resUserData => this.users = resUserData
    );
  }

  onDeleteUser(id){
    if(confirm("Are you sure to delete this user")) {
      this.userService.deleteUser(id).subscribe(
        res => {
          this.userService.getUsers().subscribe(
            resUserData => this.users = resUserData
          );
          this.showDeleteMessage = true;
          setTimeout(() => this.showDeleteMessage = false, 6000);
          window.scroll(0,0);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  onUpdateUser(id){
    this.userService.setId(id);
    this.router.navigate(['/updateuser']);
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  myProfile(){
    this.router.navigate(['/userprofile']);
  }

  onHoliday(){
    this.router.navigate(['/holidays']);
  }

  addEmployee(){
    this.router.navigate(['/register']);
  }

}
