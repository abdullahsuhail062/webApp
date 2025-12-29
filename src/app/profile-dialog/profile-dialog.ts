import { Component, EventEmitter, Input, input, Output, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { authStore } from '../auth-store';
import { User } from '../models/user';
import { EditProfile } from '../edit-profile/edit-profile';
import { Setting } from '../setting/setting';




@Component({
  imports: [EditProfile, Setting],
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.html',
  styleUrl: './profile-dialog.css',
})
export class ProfileDialog {
 

  constructor(private router: Router){}
editProfileUser = signal<User>(authStore.user())
 user = input<User>()

   editMode = signal(false);

 close = output<boolean>()

  goToDashboard() {
    this.router.navigate(['/dashboard'])
    this.closeDialog()
  }
  openSettings() {

  }

  editProfile() {
    this.editMode.set(true)

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


openEdit() {
  this.editMode.set(true);
}

closeEdit() {
  this.editMode.set(false);
}

onSave(updatedUser: User) {
  this.user

}
}
