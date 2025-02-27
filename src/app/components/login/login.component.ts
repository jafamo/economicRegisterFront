import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log('Token recibido:', res.token);
        localStorage.setItem('authToken', res.token);
        this.getProfile(res.token);
        this.router.navigate(['/category-list']);

      },
      error: (err) => {
        console.error('Error en el login', err);
        this.loginError = 'Correo o contraseña incorrectos';
      }
    });
  }


  getProfile(token: string) {
    this.authService.getProfile(token).subscribe({
      next: (profile) => {
        console.log('Perfil:', profile);
        this.authService.setProfile(profile); // Almacena el perfil en el servicio
      },
      error: (err) => {
        console.error('Error al obtener perfil', err)
        this.router.navigate(['/login']);
      }
    });
  }

  isInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control.hasError('email')) {
      return 'Formato de correo no válido';
    }
    if (control.hasError('minlength')) {
      return `Debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
