import { signal, computed } from '@angular/core';
import { isBrowser } from './browser.util';

const userSignal = signal<any | null>(null);
const tokenSignal = signal<string | null>(null);

// NEW: loading indicator (prevents signin page flash)
const initializedSignal = signal(false);

export const authStore = {
  user: userSignal,
  token: tokenSignal,
  initialized: initializedSignal,

  isLoggedIn: computed(() => !!tokenSignal()),

  setAuth(user: any, token: string) {
    userSignal.set(user);
    tokenSignal.set(token);

    if (isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  loadFromStorage() {
    if (!isBrowser) return;

    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token) tokenSignal.set(token);

    if (userStr) {
      try {
        userSignal.set(JSON.parse(userStr));
      } catch {
        localStorage.removeItem('user');
        userSignal.set(null);
      }
    }

    // Mark initialization complete
    initializedSignal.set(true);
  },

  logout() {
    userSignal.set(null);
    tokenSignal.set(null);

    if (isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
};
