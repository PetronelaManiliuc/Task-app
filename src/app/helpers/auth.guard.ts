import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { ErrorResponse } from '../models/error-response';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var sessionData = this.tokenService.getSession();
    if (sessionData == null) {
      this.router.navigate(['login']);
      return false;
    }
    var isValidToken = this.tokenService.isLoggedIn();
    if (!isValidToken) {
      this.tokenService.refreshToken(sessionData).pipe(
        map((data) => {
          this.tokenService.saveSession(data);
          return true;
        }),
        catchError((error: ErrorResponse) => {
          this.router.navigate(['login']);
          return EMPTY;
        })
      );
    }

    return true;
  }
}
