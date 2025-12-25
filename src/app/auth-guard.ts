import { inject, computed, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authStore } from './auth-store';
import { isPlatformBrowser } from '@angular/common';
// import { AuthService } from './auth-service';

const auth = authStore;
const router = inject(Router)

export const authGuard: CanActivateFn = () => {
   if (!isPlatformBrowser(PLATFORM_ID)) {
    return true;
  

   }


  // Wait until storage is loaded
  if (!authStore.authLoaded()) {
    return false; // Keep router from navigating temporarily
  }

  if (!authStore.isLoggedIn()) {
    return router.parseUrl('/signin');
  }

  return true;
}
