import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authStore } from './auth-store';

export const redirectIfLoggedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = !!authStore.isLoggedIn()
  

  if (isLoggedIn) {
    return router.parseUrl('/dashboard');
  }

  return true;
};
