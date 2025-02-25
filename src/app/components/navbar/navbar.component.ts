import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Verificar si el token existe en localStorage
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn; // Actualiza el estado de isLoggedIn en el navbar
    });
  }

  logout() {
    this.authService.logout(); // Llama al logout del AuthService
  }
}
