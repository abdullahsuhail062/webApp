import { signal, computed, WritableSignal, Signal } from '@angular/core';
import { isBrowser } from './browser.util';


// Create signals first
const userSignal = signal<any | null>(null);
const tokenSignal = signal<string | null>(null);

// Create the store after signals exist
export const authStore = {
  user: userSignal,
  token: tokenSignal,

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
    const user = localStorage.getItem('user');

    if (token) tokenSignal.set(token);
    if (user) userSignal.set(JSON.parse(user));
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
