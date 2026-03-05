import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Oso de Peluche Clásico",
    price: 25.00,
    category: 'Juguetes',
    image: "https://picsum.photos/seed/teddy/400/400",
    description: "Un suave compañero para todas las aventuras.",
    reviews: [
      { id: '1', userName: 'Ana G.', rating: 5, comment: '¡A mi hijo le encanta! Es súper suave.', date: '2024-02-15' },
      { id: '2', userName: 'Carlos M.', rating: 4, comment: 'Muy bonito, aunque un poco más pequeño de lo que esperaba.', date: '2024-02-10' }
    ]
  },
  {
    id: 2,
    name: "Conjunto de Algodón Orgánico",
    price: 32.50,
    category: 'Ropa',
    image: "https://picsum.photos/seed/babyclothes/400/400",
    description: "Suavidad máxima para la piel delicada.",
    reviews: [
      { id: '3', userName: 'Elena R.', rating: 5, comment: 'La calidad del algodón es increíble.', date: '2024-02-20' }
    ]
  },
  {
    id: 3,
    name: "Bloques de Madera Natural",
    price: 45.00,
    category: 'Juguetes',
    image: "https://picsum.photos/seed/blocks/400/400",
    description: "Fomenta la creatividad y la construcción."
  },
  {
    id: 4,
    name: "Vestido de Flores Primavera",
    price: 28.00,
    category: 'Ropa',
    image: "https://picsum.photos/seed/dress/400/400",
    description: "Estilo fresco y alegre para el día a día."
  },
  {
    id: 5,
    name: "Tren de Madera Pintado",
    price: 38.00,
    category: 'Juguetes',
    image: "https://picsum.photos/seed/train/400/400",
    description: "Un viaje lleno de imaginación."
  },
  {
    id: 6,
    name: "Pijama de Estrellas",
    price: 22.00,
    category: 'Ropa',
    image: "https://picsum.photos/seed/pajamas/400/400",
    description: "Para los sueños más dulces."
  },
  {
    id: 7,
    name: "Rompecabezas de Animales",
    price: 15.00,
    category: 'Juguetes',
    image: "https://picsum.photos/seed/puzzle/400/400",
    description: "Aprende jugando con los animales del bosque."
  },
  {
    id: 8,
    name: "Chaqueta de Punto Azul",
    price: 35.00,
    category: 'Ropa',
    image: "https://picsum.photos/seed/cardigan/400/400",
    description: "Calidez y estilo en una sola prenda."
  },
  {
    id: 9,
    name: "Pelota Sensorial",
    price: 12.00,
    category: 'Juguetes',
    image: "https://picsum.photos/seed/ball/400/400",
    description: "Texturas divertidas para explorar."
  },
  {
    id: 10,
    name: "Pantalones de Pana",
    price: 26.00,
    category: 'Ropa',
    image: "https://picsum.photos/seed/pants/400/400",
    description: "Resistentes y cómodos para jugar."
  },
  {
    id: 11,
    name: "Set de Té de Juguete",
    price: 29.00,
    category: 'Juguetes',
    image: "https://picsum.photos/seed/teaset/400/400",
    description: "La hora del té nunca fue tan divertida."
  },
  {
    id: 12,
    name: "Camiseta de Dinosaurio",
    price: 18.00,
    category: 'Ropa',
    image: "https://picsum.photos/seed/dino/400/400",
    description: "Para los pequeños exploradores del Jurásico."
  },
  {
    id: 13,
    name: "Coche de Carreras Retro",
    price: 20.00,
    category: 'Juguetes',
    image: "https://picsum.photos/seed/racecar/400/400",
    description: "Velocidad y diseño clásico."
  },
  {
    id: 14,
    name: "Sombrero de Sol de Paja",
    price: 14.00,
    category: 'Ropa',
    image: "https://picsum.photos/seed/sunhat/400/400",
    description: "Protección con un toque chic."
  },
  {
    id: 15,
    name: "Muñeca de Trapo Hecha a Mano",
    price: 30.00,
    category: 'Juguetes',
    image: "https://picsum.photos/seed/doll/400/400",
    description: "Un regalo único y lleno de amor."
  },
  {
    id: 16,
    name: "Zapatos de Lona Suave",
    price: 24.00,
    category: 'Ropa',
    image: "https://picsum.photos/seed/shoes/400/400",
    description: "Primeros pasos con estilo y comodidad."
  },
  {
    id: 17,
    name: "Caja de Herramientas de Madera",
    price: 42.00,
    category: 'Juguetes',
    image: "https://picsum.photos/seed/tools/400/400",
    description: "Para los pequeños constructores de la casa."
  },
  {
    id: 18,
    name: "Sudadera con Capucha de Oso",
    price: 29.50,
    category: 'Ropa',
    image: "https://picsum.photos/seed/hoodie/400/400",
    description: "Divertida y abrigada para los días frescos."
  },
  {
    id: 19,
    name: "Kit de Pintura para Dedos",
    price: 16.00,
    category: 'Juguetes',
    image: "https://picsum.photos/seed/paint/400/400",
    description: "Explosión de color y creatividad sin límites."
  },
  {
    id: 20,
    name: "Gorro de Lana con Pompones",
    price: 12.50,
    category: 'Ropa',
    image: "https://picsum.photos/seed/beanie/400/400",
    description: "El accesorio perfecto para el invierno."
  }
];
