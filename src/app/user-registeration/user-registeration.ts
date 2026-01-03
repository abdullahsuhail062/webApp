import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Route, Router, RouterLink } from '@angular/router';
import { Apis } from '../services/apis';
import { RegisterRequest } from '../models/register-request.model';
import { authStore } from '../auth-store';




@Component({
  selector: 'app-user-registeration',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-registeration.html',
  styleUrl: './user-registeration.css',
})
export class UserRegisteration {
  registerForm: FormGroup
    loading = signal(false);
  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);


constructor(private router: Router, private apiService: Apis){
  this.registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
}

 

  onSubmit() {
    const body = this.registerForm.value as RegisterRequest;
    if (this.registerForm.valid) {
      this.loading.set(true);
      this.apiService.registerUser(body).subscribe({
        next: (response) => {
          authStore.setAuth(response.user, response.token);
          this.loading.set(false);
          this.router.navigate(['/dashboard']);
          console.log(response.user,'toknen being verified! ');
          
  
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.loading.set(false);
          alert('Registration failed. Please try again.');
        }
      });

    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  togglePasswordVisible() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  toggleConfirmPasswordVisible() {
    this.confirmPasswordVisible.set(!this.confirmPasswordVisible());
  }

}
