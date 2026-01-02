import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/register-request.model';




@Injectable({
  providedIn: 'root',
})
export class Apis {
private apiUrl = environment.apiUrl


  constructor(private http: HttpClient) {}

  registerUser(body: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/registerUser`,{body})
  }

  loginUser(body: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/loginUser`, {body})
  }

  updateProfile(data: FormData) {
    return this.http.post(`${this.apiUrl}/users/profileUpdate`, data);
  }
  
}
