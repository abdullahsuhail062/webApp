import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, of } from 'rxjs';
import { User } from './models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSignal = signal<User | null>(null);
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  setUser(user: User | null) {
    this.userSignal.set(user);
  }

  user() {
    return this.userSignal();
  }

  isLoggedIn() {
    return !!this.userSignal();
  }

  loadUser() {
    // 🚫 SSR: do nothing
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }

    // ✅ Browser only
    return this.http
      .get<User>('/api/me', { withCredentials: true })
      .pipe(
        tap(user => this.setUser(user)),
        catchError(() => {
          this.setUser(null);
          return of(null);
        })
      );
  }
}
