import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category_service';
import { AuthService } from '../../../services/auth.service';
import { Category } from '../../../models/category/category.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-category-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup;
  isLoggedIn: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*)*$/)]], // Validación de nombre
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (!this.isLoggedIn) {
        this.router.navigate(['/login']); // Redirigir si no está logueado
      }
    });
  }

  // Función para crear la categoría
  createCategory(): void {
    if (this.categoryForm.invalid) {
      this.errorMessage = 'El nombre de la categoría no es válido. Asegúrate de que empiece con mayúscula.';
      return;
    }

    const category: Category = {
      name: this.categoryForm.value.name,
      children: [],
    };

    this.categoryService.createCategory(category).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.successMessage = 'Categoría creada con éxito!';
          setTimeout(() => {
            this.router.navigate(['/categories']); // Redirigir al listado de categorías
          }, 2000); // Redirigir después de 2 segundos para mostrar el mensaje
        }
      },
      error: (error) => {
        if (error.status === 400 && error.error.message === 'Categoria ya existe') {
          this.errorMessage = 'Ya existe una categoría con ese nombre.';
        } else {
          this.errorMessage = 'Hubo un error al crear la categoría. Por favor, inténtalo de nuevo.';
        }
      },
    });
  }
}