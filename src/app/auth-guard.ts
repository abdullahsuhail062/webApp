import { inject, computed } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authStore } from './auth-store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // If auth is NOT initialized, block routing for a moment
  if (!authStore.initialized()) {
    return false; // router waits until it becomes true
  }

  // Check login status
  const loggedIn = authStore.isLoggedIn();

  if (!loggedIn) {
    return router.parseUrl('/signin');
  }

  return true;
};
