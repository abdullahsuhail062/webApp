import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apis } from '../services/apis';
import { authStore } from '../auth-store';

@Component({
  selector: 'app-signin',
  standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
loginForm: FormGroup
loading = signal(false);
  passwordVisible = signal(false);
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

    this.loading.set(true);
    console.log(this.loginForm.value);
    
    this.apiService.loginUser(this.loginForm.value).subscribe({
      next: (response) => {
        authStore.setAuth(response.user, response.token);
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.loading.set(false);
        alert('Login failed. Please try again.');
      }
    });
  }

  togglePasswordVisible() {
    this.passwordVisible.set(!this.passwordVisible());
  }

}
