import { Component, effect, input, output, signal, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Setting } from '../setting/setting';
import { User } from '../../../models/user';
import { profileSignal } from '../../profile.state';
import { Apis } from '../../../services/apis';
import { authStore } from '../../../auth-store';




@Component({
  selector: 'app-edit-profile',
  imports: [ MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, CommonModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  updateUser = output<User>()
  close = output<void>()
  user = input<User>()
  save = output<User>()


  
   username = signal('');
  password = signal('');
  confirmPassword = signal('');
  avatar = signal<string>('https://i.pravatar.cc/120');
  loading = signal(false);
  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);

  
  

  constructor(private apiService: Apis,
    public dialogRef: MatDialogRef<EditProfile>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
  
    // Sync input user → form signals
    effect(() => {
      if (this.data) {
        this.username.set(this.data.name as string);
        this.avatar.set(this.data.avatar ?? 'https://i.pravatar.cc/120');}});}

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.avatar.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  // Prepare the payload object for the API. Keeps logic centralized.
  preparePayload() {
    const name = this.username();
    const payload: any = { username: name };
    if (this.avatar() && typeof this.avatar() === 'string') {
      payload.avatar = this.avatar();
    }
    return payload;
  }

  // Call the API and handle response, errors, and global state update.
  callUpdateProfile(payload: any) {
    this.loading.set(true);
    this.apiService.updateProfile(payload).subscribe({
      next: (res: any) => {
        const updatedUser = res?.user ?? { ...this.data, name: payload.username, avatar: payload.avatar ?? this.data.avatar };
        try {
          if (authStore && typeof authStore.user?.set === 'function') {
            authStore.user.set(updatedUser);
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.setItem('user', JSON.stringify(updatedUser));
            }
          }
        } catch (e) {
          console.warn('Could not update authStore after profile update', e);
        }

        // Close dialog and return updated user
        this.dialogRef.close(updatedUser);
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('profile update failed', err);
        this.loading.set(false);
        alert('Profile update failed. Please try again.');
      }
    });
  }

  submit() {
    if (this.password() && this.password() !== this.confirmPassword()) {
      alert('Passwords do not match');
      return;
    }

    const payload = this.preparePayload();
    this.callUpdateProfile(payload);
  }

  closeEdit() {
    this.dialogRef.close();
  }

  togglePasswordVisible() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  toggleConfirmPasswordVisible() {
    this.confirmPasswordVisible.set(!this.confirmPasswordVisible());
  }

}
