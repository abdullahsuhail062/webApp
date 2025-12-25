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





export const appConfig: ApplicationConfig = {
  providers: [ 
     provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()), 
  provideHttpClient(
  withInterceptors([authInterceptor]), withFetch()
)

  ]
};
