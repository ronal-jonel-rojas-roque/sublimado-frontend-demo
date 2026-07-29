export interface Dimensions {
  width: number;
  height: number;
  depth: number;
  weight: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  dimensions?: Dimensions;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  reviewCount?: number;
}