import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap, catchError, throwError, EMPTY } from 'rxjs';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  isRefreshToken: boolean = false;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((response) => console.log(JSON.stringify(response))),
      catchError((err: any) => {
        let sessionData = this.tokenService.getSession();
        if (
          (err.status =
            '401' &&
            sessionData != null &&
            !this.tokenService.isLoggedIn() &&
            !this.isRefreshToken)
        ) {
          this.isRefreshToken = true;
          this.userService
            .refreshToken(sessionData)
            .subscribe({ next: (data) => this.tokenService.saveSession(data) },
           { error :()=>{}},
           { complete: ()=> this.isRefreshToken = false });
        } else if(err.status ='400' ){
this.tokenService.logout();
this.router.navigate(['login']);
        }else{
         return throwError(()=>  err.error);
        }
        
        return EMPTY;
      })
    );
  }
}
