import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category_service';
import { Category } from '../../../models/category/category.model';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CategoryCreateComponent implements OnInit {
  categoryForm!: FormGroup;
  categories: Category[] = []; // Lista de categorías para el desplegable
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/)]],
      parent: [null] // Permite seleccionar un padre o dejar vacío
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error al obtener categorías', err);
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) return;

    this.categoryService.createCategory(this.categoryForm.value).subscribe({
      next: () => {
        this.router.navigate(['/category-list'], {
          queryParams: { success: 'true' }
        });
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Error al crear la categoría';
      }
    });
  }
}