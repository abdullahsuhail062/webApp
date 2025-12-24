import { APP_INITIALIZER, ApplicationConfig, inject, PLATFORM_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authStore } from './auth-store';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './authInterceptor';
import { AuthService } from './auth-service';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';



export function initAuth(auth: AuthService) {
  return () => firstValueFrom(auth.loadUser());
   const platformId = inject(PLATFORM_ID);

  return () => {
    if (!isPlatformBrowser(platformId)) {
      // SSR / route extraction → do nothing
      return Promise.resolve();
    }

    return firstValueFrom(auth.loadUser());
  };
}
export const appConfig: ApplicationConfig = {
  providers: [ 
     {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService],
      multi: true
    }
,
    
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()), 
  provideHttpClient(
  withInterceptors([authInterceptor]), withFetch()
)

  ]
};
