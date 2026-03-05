export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Juguetes' | 'Ropa';
  image: string;
  description: string;
  reviews?: Review[];
}
