import { Component, input, signal, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { authStore } from '../../../auth-store';
import { User } from '../../../models/user'; 
import { EditProfile } from '../edit-profile/edit-profile';
import { Setting } from '../setting/setting';
import { CommonModule } from '@angular/common';




@Component({
  imports: [EditProfile, Setting, MatDialogModule, MatButtonModule, CommonModule],
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.html',
  styleUrl: './profile-dialog.css',
})
export class ProfileDialog {
 editProfileUser = signal<User>(authStore.user())
 user = input<User>()
 
  editMode = signal(false);
  dialog = inject(MatDialog);

  constructor(private router: Router){}


 
  openSettings() {
    this.dialog.open(Setting, {
      width: '400px',
      data: this.user()
    });
  }

  editProfile(event?: MouseEvent) {
    // Compute dialog position near the clicked element when possible
    let position: { top?: string; left?: string } = {};
    if (typeof window !== 'undefined' && event) {
      // Prefer currentTarget (the button) but fall back to target
      const targetEl = (event.currentTarget || event.target) as HTMLElement | null;
      if (targetEl && typeof targetEl.getBoundingClientRect === 'function') {
        const rect = targetEl.getBoundingClientRect();
        // position to the right of the button if space allows, otherwise align left
        const preferredLeft = rect.right + 8; // 8px gap
        const dialogWidth = 500; // matches width below
        const maxLeft = Math.max(8, (window.innerWidth - dialogWidth) - 8);
        const left = Math.min(preferredLeft, maxLeft);
        const top = Math.max(8, rect.top);
        position = { left: `${left}px`, top: `${top}px` };
      }
    }

    // Fallback: center horizontally if no position computed
    if (!position.left && typeof window !== 'undefined') {
      const dialogWidth = 500;
      position.left = `${Math.max(8, Math.floor((window.innerWidth - dialogWidth) / 2))}px`;
      position.top = `100px`;
    }

    const dialogRef = this.dialog.open(EditProfile, {
      width: '500px',
      data: this.editProfileUser(),
      position,
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.editProfileUser.set(result);
        // You can emit or save the updated user here
      }
    });
  }


  closeDialog() {
    // If this component is used in a dialog, close the parent dialog
    const parentDialog = inject(MatDialog);
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
  this.editProfileUser.set(updatedUser);
}

 goToDashboard() {
    this.router.navigate(['/dashboard'])
    this.closeDialog()
  }
}
