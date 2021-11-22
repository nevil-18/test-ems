import { Component, OnInit, NgZone, ViewChild  } from '@angular/core';
import {  FormControl, NgForm, FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { SocialUser } from "angularx-social-login";
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('signInForm') signInForm: NgForm;

  constructor(private userService: UserService,private router : Router, private authService: SocialAuthService) { }
  model ={
    playpowerEmail: '',
    password: ''
  }
  user: SocialUser;
  loggedIn: boolean;
  GoogleLoginProvider = GoogleLoginProvider;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  onSubmit(form : NgForm){
    if(this.user)
    {
      form.value.playpowerEmail = this.user.email;
      form.value.password = 'defaultValue';
    }
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
      },
      err => {
        this.serverErrorMessages = err.error.message;
        setTimeout(() => this.serverErrorMessages = '', 5000);
      }
    );
    setTimeout(() => this.signOut(), 2000);
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut();
  }
  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}