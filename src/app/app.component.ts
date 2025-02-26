import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet], // Importamos los componentes aquí
  template: `
    <app-navbar></app-navbar>   
    <router-outlet></router-outlet> 
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'economic Register';
  isLoggedIn = false;  // Definir si el usuario está logueado

  constructor(private router: Router) {}

  // Aquí puedes actualizar el estado de `isLoggedIn` después del login exitoso.
  onLoginSuccess() {
    this.isLoggedIn = true;
    this.router.navigate(['/category-list']);  // Redirigir al listado de categorías después de login
  }
}
