import { inject, computed } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authStore } from './auth-store';


export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Wait until storage is loaded
  if (!authStore.authLoaded()) {
    return false; // Keep router from navigating temporarily
  }

  if (!authStore.isLoggedIn()) {
    return router.parseUrl('/signin');
  }

  return true;
};
