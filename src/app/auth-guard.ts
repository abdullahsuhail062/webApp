import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { authStore } from './auth-store';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Allow SSR
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Convert signal → observable and WAIT
  return toObservable(authStore.authLoaded).pipe(
    filter(loaded => loaded),   // wait until true
    take(1),
    map(() => {
      return authStore.isLoggedIn()
        ? true
        : router.parseUrl('/signin');
    })
  );
};
