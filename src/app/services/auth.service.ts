import { HttpClient, HttpHeaders} from '@angular/common/http';
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
  private profileSubject = new BehaviorSubject<any>(null); // Subject para el perfil
  public profile$ = this.profileSubject.asObservable(); // Observable para el perfil


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

   // Método para obtener el perfil con el token
   getProfile(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.get<any>(`${environment.apiUrl}/profile`, { headers });
  }

  // Método para almacenar el perfil
  setProfile(profile: any) {
    this.profileSubject.next(profile); // Actualiza el perfil
  }


  
}