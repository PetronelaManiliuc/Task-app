import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/models/error-response';
import { SignupRequest } from 'src/app/models/signup-request';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupRequest: SignupRequest = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastname: ""
  }

  isSighupFailed = false;
  errorMessage: string= "";

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    this.userService.signup(this.signupRequest).subscribe({
      next: (data => {
        this.isSighupFailed = false;
        console.debug(`sign in successfully ${data}`);
        //   this.reloadPage();
      }),
      error: ((error) => {
        this.errorMessage = error.error.message;
        this.isSighupFailed = true;
      })
    })
  }

  reloadPage(): void {
    window.location.reload();
  }

}
