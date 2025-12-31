import { Component, input, signal, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user'; 


@Component({
  selector: 'app-setting',
  imports: [MatButtonModule, MatSlideToggleModule, CommonModule],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {
  user = input<User>()
  editMode = signal(false);

  constructor(
    public dialogRef: MatDialogRef<Setting>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  openEdit() {
    this.editMode.set(true);
  }

  closeEdit() {
    this.editMode.set(false);
    this.dialogRef.close();
  }

}
