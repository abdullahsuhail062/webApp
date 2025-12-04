import { signal, computed, WritableSignal, Signal } from '@angular/core';

interface AuthStore {
  user: WritableSignal<any | null>;
  token: WritableSignal<string | null>;
  isLoggedIn: Signal<boolean>;
  setAuth: (user: any, token: string) => void;
  loadFromStorage: () => void;
  logout: () => void;
}

export const authStore: AuthStore = {
  user: signal<any | null>(null),
  token: signal<string | null>(null),
  isLoggedIn: computed(() => !!authStore.token()),

  setAuth(user: any, token: string) {
    authStore.user.set(user);
    authStore.token.set(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  loadFromStorage() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token) authStore.token.set(token);
    if (user) authStore.user.set(JSON.parse(user));
  },

  logout() {
    authStore.user.set(null);
    authStore.token.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
