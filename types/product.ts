export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category?: 'buques' | 'cestas' | 'presentes';
  categories?: string[];
  image: string;
  images: string[];
  featured: boolean; // Identifica se vai para o Carrossel da Home
  installments: string;
}
