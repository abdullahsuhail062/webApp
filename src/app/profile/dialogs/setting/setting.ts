import { Component, input, signal, Inject } from '@angular/core';
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
import { ThemeService } from '../../../theme/theme-service';
import { ThemeStore } from '../../../theme/theme-store';



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
  profileVisibility = signal(true);
  twoFactorAuth = signal(false);
  theme = Inject(ThemeStore).theme
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(public themeStore: ThemeStore,
    public dialogRef: MatDialogRef<Setting>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private router: Router,
    private apiService: Apis,
    private dialog: MatDialog,
    public themeService: ThemeService
  ) {
  }
 

  toggleTheme(event: MatSlideToggleChange) {
    this.themeStore.toggle()
     this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.applyTheme(this.currentTheme);
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
