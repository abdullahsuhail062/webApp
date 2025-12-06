import { inject } from '@angular/core';
import { CanActivate, CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { authStore } from './auth-store';

export const redirectIfLoggedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = !!authStore.isLoggedIn()
  console.log('redirectIfLoggedIn fn being called');
  

  if (isLoggedIn) {
    return router.parseUrl('/dashboard');
  }

  return true;
};
