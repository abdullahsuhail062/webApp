import { signal, computed, WritableSignal, Signal } from '@angular/core';
import { isBrowser } from './browser.util';

export interface AuthStore {
  user: WritableSignal<any | null>;
  token: WritableSignal<string | null>;
  ready: Signal<boolean>;
  isLoggedIn: Signal<boolean>;
  setAuth: (user: any, token: string) => void;
  loadFromStorage: () => void;
  logout: () => void;
}

// Create signals first
const userSignal = signal<any | null>(null);
const tokenSignal = signal<string | null>(null);
const readySignal = signal<boolean>(false);  // <-- NEW

export const authStore: AuthStore = {
  user: userSignal,
  token: tokenSignal,
  ready: readySignal,  // <-- NEW

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
    if (!isBrowser) {
      readySignal.set(true); // <-- SSR fallback
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token) tokenSignal.set(token);

      if (userStr) {
        try {
          userSignal.set(JSON.parse(userStr));
        } catch (e) {
          console.warn("Invalid JSON in localStorage 'user'. Resetting.");
          localStorage.removeItem('user');
          userSignal.set(null);
        }
      }
    } finally {
      // Mark as ready no matter what
      readySignal.set(true);
    }
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
