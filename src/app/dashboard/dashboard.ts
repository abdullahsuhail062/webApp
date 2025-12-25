import { Component, inject } from '@angular/core';
import { authStore } from '../auth-store';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  logout() {
    authStore.logout()
    
  }

}
