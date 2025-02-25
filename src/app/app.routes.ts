import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category/category-list/category-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // Ruta por defecto
    { path: 'category-list', component: CategoryListComponent },  // Redirigir a category-list después del login
    
];
