import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Route, Router, RouterLink } from '@angular/router';
import { Apis } from '../services/apis';
import { RegisterRequest } from '../models/register-request.model';
import { authStore } from '../auth-store';




@Component({
  selector: 'app-user-registeration',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './user-registeration.html',
  styleUrl: './user-registeration.css',
})
export class UserRegisteration {
  registerForm: FormGroup

constructor(private router: Router, private apiService: Apis){
  this.registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
}

 

  onSubmit() {
    const body = this.registerForm.value as RegisterRequest
    if (this.registerForm.valid) {
      this.apiService.registerUser(body).subscribe({next: (response) => {authStore.setAuth(response.user, response.token);
        this.router.navigate(['/dashboard'])
      }})

    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  

}
