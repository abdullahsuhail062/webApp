import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { authStore } from './app/auth-store';
import { runInInjectionContext } from '@angular/core';

bootstrapApplication(App, appConfig)
  .then(appRef => {
    // Run startup code before Angular begins rendering routes
    runInInjectionContext(appRef.injector, () => {
      authStore.loadFromStorage();
    });
  })
  .catch(err => console.error(err));
