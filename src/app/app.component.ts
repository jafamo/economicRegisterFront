import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent, 
    RouterOutlet, 
    ReactiveFormsModule,
    GoogleMapsModule
  ],
  template: `

    <app-navbar></app-navbar>   
    <router-outlet></router-outlet> 
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'economic Register';
  isLoggedIn = false;  // Definir si el usuario está logueado

  constructor(private router: Router) {
    const googleMapsApiKey = environment.googleMapsApiKey;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`;
    script.async = true;
    document.head.appendChild(script);
  }

  // Aquí puedes actualizar el estado de `isLoggedIn` después del login exitoso.
  onLoginSuccess() {
    this.isLoggedIn = true;
    //this.router.navigate(['/category-list']);  // Redirigir al listado de categorías después de login
  }
}
