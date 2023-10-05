import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, UrlTree } from '@angular/router';
import { AuthService } from '../app/auth/auth.service';
import { User } from './interfaces/user';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  user: User | null = null

  constructor(private userService: UserService,private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.userService
        .user$
        .pipe(take(1))
        .subscribe((data) => {
          this.user = data
        });

    if (this.authService.getToken() && this.user?.role == 'admin') {
      return true;
    } else {
      this.router.navigate(['/homepage']);
      return false;
    }
  }
}
