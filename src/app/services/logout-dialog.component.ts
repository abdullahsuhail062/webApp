import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { authStore } from '../auth-store';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <div class="logout-dialog">
      <h3>Confirm Logout</h3>
      <p>Are you sure you want to logout?</p>
      <div class="actions">
        <button (click)="onCancel()">Cancel</button>
        <button class="btn-logout" (click)="onConfirm()">Logout</button>
      </div>
    </div>
  `,
  styles: [`
    .logout-dialog { padding: 20px; border: 1px solid #ddd; background: #fff; border-radius: 8px; }
    .actions { margin-top: 20px; display: flex; gap: 10px; justify-content: center; }
    .btn-logout { background-color: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; }
    :host-context(.dark) .logout-dialog { background-color: #1f2937; color: #f3f4f6; border-color: #374151; }
  `]
})
export class LogoutDialogComponent {
  constructor(private dialogRef: MatDialogRef<LogoutDialogComponent>) {}

  onConfirm() {
  authStore.logout();
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}