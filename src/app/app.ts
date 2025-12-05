import { Component, effect, OnInit, signal } from '@angular/core';
import {  Router, RouterOutlet } from '@angular/router';
import { authStore } from './auth-store';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('webapp');
  constructor(private router: Router) {
 
  }

  ngOnInit(){
effect(() => {
      if (authStore.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
        console.log('loaded successfully');
        
      }
    });
  }
}


