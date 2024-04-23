import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService: TokenService = inject(TokenService);
  const router: Router = inject(Router);

  if (tokenService.hasToken()) {
    // logged in so return true
    return true;
  }

  // not logged in so redirect to login page with the return url
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
