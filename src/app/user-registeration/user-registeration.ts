import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Route, Router, RouterLink } from '@angular/router';
import { Apis } from '../services/apis';
import { RegisterRequest } from '../models/register-request.model';



@Component({
  selector: 'app-user-registeration',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './user-registeration.html',
  styleUrl: './user-registeration.css',
})
export class UserRegisteration {
  formGroup: any

constructor(private router: Router, private apiService: Apis){}

 registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit() {
    const body = this.registerForm.value as RegisterRequest
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
      this.apiService.registerUser(body).subscribe({next: (response) => {console.log(response)}})

    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  

}
