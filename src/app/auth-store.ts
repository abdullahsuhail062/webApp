import { signal, computed } from '@angular/core';
import { isBrowser } from './browser.util';

const userSignal = signal<any | null>(null);
const tokenSignal = signal<string | null>(null);
const authLoadedSignal = signal(false);

// Expiration time in milliseconds (1 hour)
const TOKEN_EXPIRATION = 60 * 60 * 1000;

export const authStore = {
  user: userSignal,
  token: tokenSignal,
  authLoaded: authLoadedSignal,

  isLoggedIn: computed(() => !!tokenSignal()),

  setAuth(user: any, token: string) {
    const now = Date.now();

    userSignal.set(user);
    tokenSignal.set(token);

    if (isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('tokenTimestamp', now.toString()); // store timestamp
    }
  },

  loadFromStorage() {
    if (!isBrowser) return;

    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const tokenTimestampStr = localStorage.getItem('tokenTimestamp');

    let tokenValid = false;

    if (token && tokenTimestampStr) {
      const tokenTimestamp = parseInt(tokenTimestampStr, 10);
      const now = Date.now();

      if (now - tokenTimestamp < TOKEN_EXPIRATION) {
        tokenSignal.set(token);
        tokenValid = true;
      } else {
        // Token expired
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenTimestamp');
      }
    }

    if (tokenValid && userStr) {
      try {
        userSignal.set(JSON.parse(userStr));
      } catch {
        localStorage.removeItem('user');
        userSignal.set(null);
      }
    }

    authLoadedSignal.set(true);
  },

  logout() {
    userSignal.set(null);
    tokenSignal.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenTimestamp');
  }
};
