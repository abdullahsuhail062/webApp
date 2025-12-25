import { provideRouter } from '@angular/router';
provideBrowserGlobalErrorListeners
import { routes } from './app.routes';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authStore } from './auth-store';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './authInterceptor';
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
