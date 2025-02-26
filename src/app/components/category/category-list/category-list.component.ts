import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category/category_service';
import { AuthService } from '../../../services/auth.service';
import { Category } from '../../../models/category/category.model';

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


  constructor(private categoryService: CategoryService, private authService: AuthService) {}

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
        console.error('Error al obtener categorías', err);
      }
    });
  }

  toggleCategoryExpansion(categoryId: number| undefined): void {
    /*if (this.expandedCategoryId === categoryId) {
      this.expandedCategoryId = null; // Si ya está expandido, lo colapsamos
    } else {
      this.expandedCategoryId = categoryId; // Si no, expandimos
    }*/
      if (categoryId !== undefined) {
        // Solo llamamos si categoryId no es undefined
        this.expandedCategoryId = categoryId;
      }
  }
}