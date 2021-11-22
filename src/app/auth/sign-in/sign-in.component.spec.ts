import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import{HttpClientTestingModule} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { SocialAuthServiceConfig } from 'angularx-social-login';
import { SignInComponent } from './sign-in.component';
import { UserService } from '../../shared/user.service'
import { environment } from 'src/environments/environment';

fdescribe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let socialService: SocialAuthService;
  let http: HttpClient;
  
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
      declarations: [ SignInComponent ],
      providers:[
        UserService,
        SocialAuthService,
      {
        provide:"SocialAuthServiceConfig",
        useValue:{
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(environment.googleClient),
            },
          ],
        } as SocialAuthServiceConfig,
      },
    ],
    })
    .compileComponents();
    socialService = TestBed.inject(SocialAuthService);
    http = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SignInComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('Email Validation', () => {
    it('should check for Invalid Email Input', waitForAsync(() => {
      fixture.whenStable().then(() => {
        let playpowerEmail = component.signInForm.controls['playpowerEmail'];
        expect(playpowerEmail.valid).toBeFalsy();
        expect(playpowerEmail.errors['required']).toBeTruthy();
        playpowerEmail.setValue('abcdef');
        expect(playpowerEmail.errors['required']).toBeFalsy();
        expect(playpowerEmail.errors['pattern']).toBeTruthy();
        expect(playpowerEmail.valid).toBeFalsy();
      });
    })
    );
    it('should check for Valid Email Input', waitForAsync(() => {
      fixture.whenStable().then(() => {
        let playpowerEmail = component.signInForm.controls['playpowerEmail'];
        expect(playpowerEmail.valid).toBeFalsy();
        expect(playpowerEmail.errors['required']).toBeTruthy();
        playpowerEmail.setValue('abc@playpowerlabs.com');
        expect(playpowerEmail.errors).toBeNull();
        expect(playpowerEmail.valid).toBeTruthy();
      });
    })
    );
  })

  describe('Password Validation', () => {
    it('should check for Invalid Password Input', waitForAsync(() => {
      fixture.whenStable().then(() => {
        let password = component.signInForm.controls['password'];
        expect(password.valid).toBeFalsy();
        expect(password.errors['required']).toBeTruthy();
        password.setValue('a12');
        expect(password.errors['required']).toBeFalsy();
        expect(password.errors['minlength']).toBeTruthy();
        expect(password.valid).toBeFalsy();
      });
    })
    );
    it('should check for Valid Password Input', waitForAsync(() => {
      fixture.whenStable().then(() => {
        let password = component.signInForm.controls['password'];
        expect(password.valid).toBeFalsy();
        expect(password.errors['required']).toBeTruthy();
        password.setValue('a1234');
        expect(password.errors).toBeNull();
        expect(password.valid).toBeTruthy();
      });
    })
    );
  })

  describe('Form Validation', () => {
    it('should check for Invalid Form Credentials due to Invalid Email', waitForAsync(() => {
      fixture.whenStable().then(() => {
        let playpowerEmail = component.signInForm.controls['playpowerEmail'];
        let password = component.signInForm.controls['password'];
        playpowerEmail.setValue('abcplay');
        password.setValue('a1234');
        expect(playpowerEmail.errors['pattern']).toBeTruthy();
        expect(component.signInForm.valid).toBeFalsy();
      });
    })
    );
    it('should check for Invalid Form Credentials due to Invalid password', waitForAsync(() => {
      fixture.whenStable().then(() => {
        let playpowerEmail = component.signInForm.controls['playpowerEmail'];
        let password = component.signInForm.controls['password'];
        playpowerEmail.setValue('abc@playpowerlabs.com');
        password.setValue('a12');
        expect(password.errors['minlength']).toBeTruthy();
        expect(component.signInForm.valid).toBeFalsy();
      });
    })
    );
    it('should check for Valid Form Credentials', waitForAsync(() => {
      fixture.whenStable().then(() => {
        let playpowerEmail = component.signInForm.controls['playpowerEmail'];
        let password = component.signInForm.controls['password'];
        playpowerEmail.setValue('abc@playpowerlabs.com');
        password.setValue('a1234');
        expect(component.signInForm.valid).toBeTruthy();
      });
    })
    );
  })
});
