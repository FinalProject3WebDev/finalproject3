import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, UrlTree } from '@angular/router';
import { AuthService } from '../app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getToken() && JSON.parse(this.authService.getUser() as string).role == 'admin') {
      return true;
    } else {
      this.router.navigate(['/homepage']);
      return false;
    }
  }
}
