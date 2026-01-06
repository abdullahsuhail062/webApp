import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Apis } from './apis';

@Component({
  selector: 'app-delete-account-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  template: `
    <div class="delete-dialog">
      <h3>Confirm Account Deletion</h3>
      <p>Please enter your password to confirm. This action cannot be undone.</p>
      <div class="w-full px-4 sm:px-6 relative">
        <input
          [type]="isPasswordVisible ? 'text' : 'password'"
          [(ngModel)]="password"
            autocomplete="new-password"
          placeholder="Enter your password"
          class="w-full rounded-md border border-gray-300 px-4 py-2 
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 text-sm sm:text-base pr-12"
        />
        <button type="button" (click)="togglePasswordVisibility()" 
                class="absolute right-8 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 font-medium focus:outline-none">
          {{ isPasswordVisible ? 'Hide' : 'Show' }}
        </button>
      </div>


      @if (errorMessage) {
        <div class="error">{{ errorMessage }}</div>
      }

      <div class="actions">
        <button (click)="onCancel()" [disabled]="isLoading">Cancel</button>
        <button class="btn-delete" (click)="onConfirm()" [disabled]="!password || isLoading">
          @if (isLoading) { Deleting... } @else { Delete Account }
        </button>
      </div>
    </div>
  `,
  styles: [`
    .delete-dialog { padding: 20px; border: 1px solid #ddd; background: #fff; border-radius: 8px; }
    .error { color: red; margin-top: 10px; font-size: 0.9em; }
    .actions { margin-top: 20px; display: flex; gap: 10px; justify-content: center; }
    .btn-delete { background-color: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; }
    .btn-delete:disabled { background-color: #e0a1a9; cursor: not-allowed; }
  `]
})
export class DeleteAccountDialogComponent {
  password: string = '';
  errorMessage = '';
  isPasswordVisible = false;
  isLoading = false;

  constructor(private apis: Apis, private dialogRef: MatDialogRef<DeleteAccountDialogComponent>) {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onConfirm() {
    this.isLoading = true;
    this.errorMessage = '';
    this.apis.deleteAccount(this.password).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = 'Incorrect password or failed to delete account.';
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}