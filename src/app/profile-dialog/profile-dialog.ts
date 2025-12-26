import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { authStore } from '../auth-store';
import { User } from '../models/user';



@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-dialog.html',
  styleUrl: './profile-dialog.css',
})
export class ProfileDialog {
 

  constructor(private router: Router){}

 @Input({ required: true }) user!: {
    name?: string;
    email?: string;
    avatar?: string;
  };

  @Output() close = new EventEmitter<boolean>();

  goToDashboard() {
    this.router.navigate(['/dashboard'])
    this.closeDialog()
  }


  closeDialog() {
    this.close.emit(true)
  }

  goTo(path: string) {
    this.router.navigateByUrl(path);
    this.closeDialog();
  }

  logout() {
    authStore.logout();
    this.router.navigateByUrl('/signin', { replaceUrl: true });
    this.closeDialog();
  }
}
