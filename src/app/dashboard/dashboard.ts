import { Component, inject, signal } from '@angular/core';
import { authStore } from '../auth-store';
import { Router } from '@angular/router';
import { ProfileDialog } from '../profile-dialog/profile-dialog';


@Component({
  selector: 'app-dashboard',
  imports: [ProfileDialog],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
constructor(private router: Router) {}

 showProfile = signal(false);

  user = {
    name: 'Chand',
    email: 'chand@example.com',
    avatar: 'assets/avatar.png',
  };

  openProfile() {
    this.showProfile.set(true);
  }

  closeProfile() {
    this.showProfile();
  }
 
    
  

}
