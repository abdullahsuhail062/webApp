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
      this.avatar.set(reader.result as string);}}


  submit() {
    if (this.password() && this.password() !== this.confirmPassword()) {
      alert('Passwords do not match');
      return;}
      
    this.updateProfile()
    this.userUpdaterFn()}
   

  closeEdit() {
    this.dialogRef.close();}

  updateProfile() {
     const formData = new FormData();
  formData.append('username', this.username());
    const profile = profileSignal()
  if (profile.image instanceof File) {
    formData.append('image', this.avatar());}
    const name = this.username()
    console.log(name);
    
  this.apiService.updateProfile(name).subscribe({
    next: (res) => {console.log('profile updated successfully')}})}
  

  userUpdaterFn() {
     const updatedUser: User = {
      ...this.data,
      name: this.username(),
      avatar: this.avatar()};
    this.dialogRef.close(updatedUser);
  }
  
}
