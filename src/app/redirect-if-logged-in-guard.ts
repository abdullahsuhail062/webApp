import { inject } from '@angular/core';
import { CanActivate, CanMatchFn, Router } from '@angular/router';
import { authStore } from './auth-store';

export const redirectIfLoggedInGuard = () => {
  const router = inject(Router);
  const isLoggedIn = authStore.isLoggedIn()
  console.log('redirectIfLoggedIn fn being called');
  

  if (isLoggedIn) {
    return router.parseUrl('/dashboard');
  }

  return true;
};
