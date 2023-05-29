import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'Task-app';
  isLoggedIn: boolean = false;

  /**
   *
   */
  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.tokenService.isLoggedIn();
  }

  logout(): void {
    this.tokenService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
