import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('auth interceptor');
    let requestFromApi = request.url.indexOf(environment.apiUrl) > 0;
    let isLoggedIn = this.tokenService.isLoggedIn();
    let jwtToken = `Bearer ${this.tokenService.getSession()?.accessToken}`;
    console.log(jwtToken);
    if (requestFromApi && isLoggedIn) {
      request = request.clone({
        headers: request.headers.append('Authorization', jwtToken),
      });
    }

    return next.handle(request);
  }
}

export const AuthInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true };
