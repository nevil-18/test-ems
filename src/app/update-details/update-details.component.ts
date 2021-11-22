import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { DepartmentService } from '../shared/department.service'

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {
  userDetails;
  playpowerRegex = /^[A-Za-z0-9._%+-]+@playpowerlabs.com$/;
  constructor(public userService: UserService, private router: Router, private departmentService: DepartmentService) { }
  
  departments: any = [];
  showUpdateSucessMessage: boolean;
  serverErrorMessages: string;
  adminOrNot: boolean;

  ngOnInit(): void {
    window.scroll(0,0);
    this.adminOrNot=this.userService.getAdmin();
    this.departmentService.getDepartment().subscribe(
    resDepartmentData => this.departments = resDepartmentData
    );
    this.userService.fetchUser(this.userService.getId()).subscribe(
      res => {
        this.userDetails = res['user'];
        this.userService.updateUserDetails(this.userDetails);
      },
      err => { 
        console.log(err);
      }
    );
  }
  
  onSubmit(form: NgForm) {
    this.userService.updateUser(form.value,this.userService.getId()).subscribe(
      res => {
        this.showUpdateSucessMessage = true;
        setTimeout(() => this.showUpdateSucessMessage = false, 3000);
        setTimeout(() => this.router.navigate(['/searchemployees']), 4000);
        window.scroll(0,0);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
        {
          this.serverErrorMessages = JSON.stringify(err, ["message", "arguments", "type", "name"]);
        }
        setTimeout(() => this.serverErrorMessages = "", 4000);
        window.scroll(0,0);
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  myProfile(){
    this.router.navigate(['/userprofile']);
  }

  onSearchUsers(){
    this.router.navigate(['/searchemployees'])
  }

}
