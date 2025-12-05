import { Component, effect, signal } from '@angular/core';
import {  Router, RouterOutlet } from '@angular/router';
import { authStore } from './auth-store';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('webapp');
  constructor(private router: Router) {
 effect(() => {
      if (authStore.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}


