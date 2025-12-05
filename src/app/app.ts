import { Component, effect, OnInit, signal } from '@angular/core';
import {  Router, RouterOutlet } from '@angular/router';


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


