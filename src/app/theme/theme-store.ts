// theme.store.ts
import { Injectable, signal, computed } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private _theme = signal<Theme>('light');

  theme = computed(() => this._theme());

  setTheme(theme: Theme) {
    this._theme.set(theme);
  }

  toggle() {
    this._theme.set(this._theme() === 'dark' ? 'light' : 'dark');
  }
}
