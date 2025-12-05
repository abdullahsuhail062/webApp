import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { authStore } from './auth-store';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);

  if (!authStore.isLoggedIn()) {
    return router.parseUrl('/signin');
  }

  return true;
};
