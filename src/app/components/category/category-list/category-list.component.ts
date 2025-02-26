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
}