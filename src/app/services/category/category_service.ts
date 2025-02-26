import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../../models/category/category.model'; // Importa la interfaz desde el modelo

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrlCategories;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Accept': 'application/json'
    });

    return this.http.get<Category[]>(this.apiUrl, { headers });
  }

  // Función para organizar categorías en una estructura de árbol
  mapCategoriesToTree(categories: Category[]): Category[] {
    const categoryMap = new Map<number, Category>();
    const roots: Category[] = [];

    // Mapea todas las categorías por su ID
    categories.forEach(category => {
      category.children = []; // Inicializamos 'children' como un arreglo vacío
      category.childrenCount = 0;
      categoryMap.set(category.id, category);
    });

    // Organiza las categorías por sus relaciones parent-child
    categories.forEach(category => {
      if (category.parent) {
        const parentId = this.extractCategoryId(category.parent);
        const parentCategory = categoryMap.get(parentId);
        if (parentCategory) {
          parentCategory.children.push(category); // Añadimos 'category' a 'children' de su padre
          parentCategory.childrenCount++;
        }
      } else {
        roots.push(category); // Si no tiene padre, la agregamos a las raíces
      }

      // Para cada hijo en 'children' (que son URLs), los convertimos en objetos de categoría
      category.children = category.children.map((childUrl: Category) => {
        const childId = this.extractCategoryId(childUrl.name); // Extraemos el ID de la URL
        return categoryMap.get(childId); // Devolvemos el objeto 'Category' correspondiente
      }).filter((child: Category | undefined) => child !== undefined) as Category[]; // Filtramos los 'undefined'

    });

    return roots;
  }

  // Función para extraer el ID de una URL de categoría
  private extractCategoryId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1]);
  }
}