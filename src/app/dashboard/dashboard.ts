import { Component, inject, signal } from '@angular/core';
import { authStore } from '../auth-store';
import { Router } from '@angular/router';
import { ProfileDialog } from '../profile-dialog/profile-dialog';
import { User } from '../models/user';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProfileDialog],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
constructor(private router: Router) {}
user = signal<User>(authStore.user())

 showProfile = signal(false);

  

  openProfile() {
    if (this.showProfile() ===false) {
      this.showProfile.set(true);
      
} else {
  this.showProfile.set(false)
}
  }

  closeProfile() {
    this.showProfile.set(false);
  }
 
    
  

}
