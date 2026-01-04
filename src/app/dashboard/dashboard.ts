import { Component, inject, signal, computed } from '@angular/core';
import { authStore } from '../auth-store';
import { Router } from '@angular/router';
import { ProfileDialog } from '../profile/dialogs/profile-dialog/profile-dialog'; 
import { User } from '../models/user';
import { ClickOutsideDirective } from '../directives/click-outside.directive';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProfileDialog, ClickOutsideDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
constructor(private router: Router) {}
user = computed(() => authStore.user())

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
