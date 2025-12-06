import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apis } from '../services/apis';
import { authStore } from '../auth-store';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
loginForm: FormGroup
constructor(private router: Router, private apiService: Apis) {
   this.loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });


}
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log("Login data:", this.loginForm.value);
    this.apiService.loginUser(this.loginForm.value).subscribe({next: (response) => {authStore.setAuth(response.user, response.token);
      console.log(response.token, 'what user object cantain?');
      
      this.router.navigate(['/dashboard'])
    }})    
  }

}
