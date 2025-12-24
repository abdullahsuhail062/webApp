import { Injectable, signal } from "@angular/core";

import { User } from "./models/user";
import { HttpClient } from "@angular/common/http";
import { catchError, of, tap } from "rxjs";


@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<User | null>(null);
  constructor(private http: HttpClient) {}

  loadUser() {
    return this.http.get<User>('/api/me', {
      withCredentials: true
    }).pipe(
      tap(user => this.user.set(user)),
      catchError(() => {
        this.user.set(null);
        return of(null);
      })
    );
  }

  logout() {
    return this.http.post('/api/logout', {}, {
      withCredentials: true
    });
  }
}
