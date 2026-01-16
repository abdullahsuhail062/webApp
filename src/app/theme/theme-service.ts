// theme.service.ts
import { Inject, Injectable, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeStore } from './theme-store'; 

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isBrowser: boolean;

  constructor(
    private store: ThemeStore,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (!this.isBrowser) return;

    // Load stored theme
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      this.store.setTheme(saved);
    }

    // React to theme changes
    effect(() => {
      const theme = this.store.theme();
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }
}
