import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, NavbarComponent, RouterOutlet], // Importamos los componentes aquí
  template: `
    <app-navbar></app-navbar>   
    <app-login></app-login>
    <router-outlet></router-outlet> 
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'economic Register';
}