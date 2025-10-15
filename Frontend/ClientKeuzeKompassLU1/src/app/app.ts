import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Belangrijk: RouterOutlet importeren
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Keuze Kompas';
  
  constructor() {
    console.log('AppComponent loaded'); // Debug log
  }
}