import { Component, input, signal } from '@angular/core';
import { User } from '../models/user';


@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {
  user = input<User>()
  editMode = signal(false);

openEdit() {
  this.editMode.set(true);
}

closeEdit() {
  this.editMode.set(false);
}

}
