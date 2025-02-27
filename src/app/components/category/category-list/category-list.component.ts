import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category/category_service';
import { AuthService } from '../../../services/auth.service';
import { Category } from '../../../models/category/category.model';
import { Router } from '@angular/router'; // Importa Router para redirigir

@Component({
  selector: 'app-category-list',
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  isLoggedIn = false;
  expandedCategoryId: number | null = null; // Mantener el estado expandido de una categoría

  constructor(
    private categoryService: CategoryService, 
    private authService: AuthService, 
    private router: Router // Inyecta Router para poder redirigir
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.loadCategories();
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        // Organiza las categorías en una estructura jerárquica
        this.categories = this.categoryService.mapCategoriesToTree(data);
      },
      error: (err) => {
        if (err.status === 401 && err.error.message === "Expired JWT Token") {
          // Redirige a la ruta category-list si el token ha expirado
          this.router.navigate(['/category-list']);
        } else {
          console.error('Error al obtener categorías', err);
        }
      }
    });
  }

  toggleCategoryExpansion(categoryId: number | undefined): void {
    if (categoryId !== undefined) {
      this.expandedCategoryId = categoryId;
    }
  }
}
