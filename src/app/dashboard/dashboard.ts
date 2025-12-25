import { Component, inject } from '@angular/core';
import { authStore } from '../auth-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
constructor(private router: Router) {}
  logout() {
    authStore.logout()
    this.router.navigate(['/signin'])
    
  }

}
