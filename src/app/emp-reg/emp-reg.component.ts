import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../shared/user.service';
import { DepartmentService } from '../shared/department.service'

@Component({
  selector: 'app-emp-reg',
  templateUrl: './emp-reg.component.html',
  styleUrls: ['./emp-reg.component.css']
})
export class EmpRegComponent implements OnInit {
  @ViewChild('signUpForm') signUpForm: NgForm;
  playpowerRegex = /^[A-Za-z0-9._%+-]+@playpowerlabs.com$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  departments: any = [];
  adminOrNot: boolean;

  constructor(public userService: UserService, private router : Router, private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.adminOrNot=this.userService.getAdmin();
    this.departmentService.getDepartment().subscribe(
      resDepartmentData => this.departments = resDepartmentData
    );
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 6000);
        this.resetForm(form);
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
        window.scroll(0,0);
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      playpowerEmail: '',
      password: '',
      firstName: '',
      middleName: '',
      lastName: '',
      designation: '',
      department: '',
      dateOfJoining: '',
      phone: '',
      address: '',
      admin: '',
      _id: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  onEmpSearch(){
    this.router.navigate(['/employeeprofile']);
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  Profile(){
    this.router.navigate(['/userprofile']);
  }

}
