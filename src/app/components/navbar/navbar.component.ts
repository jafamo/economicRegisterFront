import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName: string | null = null; // Almacena el nombre del usuario
  private routerSubscription: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.checkIfUserIsLoggedIn();
    });

    // Suscribirse al perfil del usuario para obtener el nombre
    this.authService.profile$.subscribe((profile) => {
      if (profile) {
        this.userName = profile.name || profile.email; // Puedes usar el nombre o el correo
      }
    });

    // Escuchar cambios en la navegación para recargar el perfil
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // En cada cambio de ruta, actualizamos el perfil
      if (this.isLoggedIn) {
        this.authService.getProfile(localStorage.getItem('authToken') || '').subscribe({
          next: (profile) => {
            this.authService.setProfile(profile);
          },
          error: (err) => {
            console.error('Error al obtener perfil', err);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Evitar fugas de memoria
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  checkIfUserIsLoggedIn(): boolean {
    return this.isLoggedIn;
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

  goToNewCategory() {
    this.router.navigate(this.isLoggedIn ? ['/create-category'] : ['/login']);   
  }

  goToCategories() {    
    this.router.navigate(this.isLoggedIn ? ['/category-list'] : ['/login']);
  }

  goToDashboard() {    
    this.router.navigate(this.isLoggedIn ? ['/dashboard'] : ['/login']);
  }
}