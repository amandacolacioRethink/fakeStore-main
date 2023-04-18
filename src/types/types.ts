export {Category, Product, ProductWithRating}

type Category = {
    id?: number;
    name: string;
};

  
type Product = {
    id?: number;
    title: string;
    description: string;
    price: number
    category: string;
    image: string;
    rate:number, 
    count: number;
};

type ProductWithRating = {
    id?: number;
    title: string;
    description: string;
    price: number
    category: string;
    image: string;
    rating: {rate:number, 
    count: number};
};

