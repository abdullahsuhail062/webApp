import { Component, effect, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import {  Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth-service';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  protected readonly title = signal('webapp');
 

  constructor(private router: Router) {
 
 
  }
  

 
}


