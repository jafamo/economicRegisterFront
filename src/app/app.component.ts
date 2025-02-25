import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent],
  template: '<app-login></app-login>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'economicRegister';
}
