import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user-response';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  profile: UserResponse = {
    email: "",
    firstName: "",
    lastname: ""
  }
  isLoggedIn = true;

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    let isLoggedIn = this.tokenService.isLoggedIn();
    if (!isLoggedIn) {
      this.isLoggedIn = false;

      this.router.navigate(['login']);
    }
  }

  onSubmit(): void {

  }

  reloadPage(): void {
    window.location.reload();
  }

}
