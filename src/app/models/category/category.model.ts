export interface Category {
  id?: number;
  name: string;
  parent?: string;
  children: Category[]; // Asegúrate de que 'children' sea un arreglo de 'Category'
  isExpanded?: boolean; // Nueva propiedad para controlar la expansión
  childrenCount?: number;
}