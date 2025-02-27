import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'category-list', component: CategoryListComponent },
    { path: 'create-category', component: CategoryCreateComponent },
    { path: 'dashboard', component: DashboardComponent}
];