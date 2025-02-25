import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.loggedInSubject.next(true); // Si el token existe, está logueado
    }
  }

  get isLoggedIn() {
    return this.loggedInSubject.asObservable();
  }

  
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          if (res.token) {
            localStorage.setItem('authToken', res.token);  // Guardar el token en localStorage
            this.loggedInSubject.next(true); // Actualiza el estado de login
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.loggedInSubject.next(false); // Cambia el estado a no logueado
  }
  
  getProfile(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}