import { Component, input, signal, Inject, effect } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user'; 
import { authStore } from '../../../auth-store';
import { Router } from '@angular/router';
import { Apis } from '../../../services/apis';
import { DeleteAccountDialogComponent } from '../../../services/delete-account-dialog.component';


@Component({
  selector: 'app-setting',
  imports: [MatButtonModule, MatSlideToggleModule, CommonModule, FormsModule, MatDialogModule],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {
  user = input<User>()
  editMode = signal(false);

  // Settings signals
  emailNotifications = signal(true);
  pushNotifications = signal(false);
  darkMode = signal(false);
  profileVisibility = signal(true);
  twoFactorAuth = signal(false);

  constructor(
    public dialogRef: MatDialogRef<Setting>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private router: Router,
    private apiService: Apis,
    private dialog: MatDialog
  ) {
    // Initialize dark mode based on localStorage or system preference
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.darkMode.set(isDark);

    // Automatically apply dark mode class and save preference when signal changes
    effect(() => {
      const isDark = this.darkMode();
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  toggleDarkMode(event: MatSlideToggleChange) {
    this.darkMode.set(event.checked);
  }

  openEdit() {
    this.editMode.set(true);
  }

  closeEdit() {
    this.editMode.set(false);
    this.dialogRef.close();
  }

  saveSettings() {
    // TODO: Call API to save settings
    console.log({
      emailNotifications: this.emailNotifications(),
      pushNotifications: this.pushNotifications(),
      darkMode: this.darkMode(),
      profileVisibility: this.profileVisibility(),
      twoFactorAuth: this.twoFactorAuth(),
    });
    this.dialogRef.close();
  }

  openDeleteConfirm() {
    this.dialog.open(DeleteAccountDialogComponent).afterClosed().subscribe(deleted => {
      if (deleted) {
        authStore.logout();
        this.dialogRef.close();
        this.router.navigateByUrl('/signin', { replaceUrl: true });
      }
    });
  }
}
