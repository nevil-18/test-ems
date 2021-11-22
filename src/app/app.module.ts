// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { AuthGuard } from './authguard/auth.guard';
import { AuthInterceptor } from './authguard/auth.interceptor';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { AuthComponent } from './auth/auth.component';
import { GetEmpProfileComponent } from './get-emp-profile/get-emp-profile.component';
import { EmpRegComponent } from './emp-reg/emp-reg.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    AuthComponent,
    GetEmpProfileComponent,
    EmpRegComponent,
    UpdateDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClient
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }