import { Component, effect, input, output, signal } from '@angular/core';
import { ProfileDialog } from '../profile-dialog/profile-dialog';
import { Setting } from '../setting/setting';
import { User } from '../models/user';
import { authStore } from '../auth-store';



@Component({
  selector: 'app-edit-profile',
  imports: [Setting],
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

  
  

  constructor() {
  
    // Sync input user → form signals
    effect(() => {
      if (this.user()) {
        this.username.set(this.username());
        this.avatar.set(this.avatar() ?? 'https://i.pravatar.cc/120');
      }
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.avatar.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.password() && this.password() !== this.confirmPassword()) {
      alert('Passwords do not match');
      return;
    }

    this.save.emit({
      
      name: this.username(),
      avatar: this.avatar()
      // password can be sent separately if needed
  });
  }

  closeEdit() {
    this.close.emit();
  }


 
  onSave(user: User) {
  this.updateUser.emit(user)
  this.close.emit()
}

updateUserFn(user: User) {

}


}
