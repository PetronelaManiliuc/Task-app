import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../models/token-response';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private readonly httpClient: HttpClient,
    private userService: UserService
  ) {}

  isLoggedIn(): boolean {
    var session = this.getSession();
    console.log(session);
    if (!session) {
      return false;
    }

    var jwtToken = JSON.parse(atob(session.accessToken.split('.')[1]));
    const isValidToken: boolean = Date.now() < jwtToken.exp * 1000;
    console.log(jwtToken.exp);
    console.log(Date.now());
    return isValidToken;
  }

  getSession(): TokenResponse | null {
    if (window.localStorage.getItem('AT')) {
      const tokenResponse: TokenResponse = {
        accessToken: window.localStorage.getItem('AT') || '',
        refreshToken: window.localStorage.getItem('RT') || '',
        firstName: window.localStorage.getItem('FN') || '',
        userId: +(window.localStorage.getItem('ID') || 0),
      };

      return tokenResponse;
    }

    return null;
  }

  saveSession(tokenResponse: TokenResponse) {
    window.localStorage.setItem('AT', tokenResponse.accessToken);
    window.localStorage.setItem('RT', tokenResponse.refreshToken);
    window.localStorage.setItem('FN', tokenResponse.firstName);
    window.localStorage.setItem('ID', tokenResponse.userId.toString());
  }

  logout() {
    window.localStorage.clear();
  }

  refreshToken(tokenResponse: TokenResponse): Observable<TokenResponse> {
    return this.userService.refreshToken(tokenResponse);
  }
}
