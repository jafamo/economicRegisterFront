import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el token existe en localStorage
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn; // Actualiza el estado de isLoggedIn en el navbar
    });
  }

  logout() {
    this.authService.logout(); // Llama al logout del AuthService
    localStorage.removeItem('authToken');  // Eliminar token
    this.isLoggedIn = false;  // Actualizar estado
    this.router.navigate(['/login']);  // Redirigir al login
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
