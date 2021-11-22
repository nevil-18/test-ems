import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './authguard/auth.guard';
import { GetEmpProfileComponent } from './get-emp-profile/get-emp-profile.component';
import { EmpRegComponent } from './emp-reg/emp-reg.component';

export const appRoutes: Routes = [
  {
    path: 'login', component: AuthComponent,
    children: [
      { 
        path: '', component: SignInComponent 
      }
    ]
  },
  {
    path: 'userprofile', component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employeeprofile', component: GetEmpProfileComponent
  },
  {
    path: 'empreg', component: EmpRegComponent
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  }
];