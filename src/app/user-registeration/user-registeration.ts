import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-registeration',
  imports: [RouterLink],
  templateUrl: './user-registeration.html',
  styleUrl: './user-registeration.css',
})
export class UserRegisteration {
constructor(private router: Router){}

  signin(){
    this.router.navigate(['/signin'])
  }

}
