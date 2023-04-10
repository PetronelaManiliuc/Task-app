import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login-request';
import { RefreshTokenRequest } from '../models/refresh-token-request';
import { SignupRequest } from '../models/signup-request';
import { TokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(
      `${environment.apiUrl}/users/login`,
      loginRequest
    );
  }

  signup(signup: SignupRequest) {
    return this.httpClient.post(`${environment.apiUrl}/users/signup`, signup, {
      responseType: 'text',
    });
  }

  refreshToken(session: TokenResponse) {
    let refreshTokenRequest: RefreshTokenRequest = {
      refreshToken: session.refreshToken,
      userId: session.userId,
    };
    return this.httpClient.post<TokenResponse>(
      `${environment.apiUrl}/users/refreshToken`,
      refreshTokenRequest
    );
  }
}
