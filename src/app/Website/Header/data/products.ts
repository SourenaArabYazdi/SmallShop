export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

// لیست محصولاتی که جستجوی هدر روی آن‌ها کار می‌کند
export const products: Product[] = [
    { id: '1', name: 'HAUTEVILLE CONCRETE ROCKING CHAIR', price: 350, image: '/product-1.jpg', category: 'Furniture', description: 'A rocking chair made of concrete with a modern minimal design.' },
    { id: '2', name: 'PAVILION SPEAKER', price: 600, image: '/product-2.jpg', category: 'Audio', description: 'A wireless speaker with rich sound and an elegant look.' },
    { id: '3', name: 'MODERN LOUNGE CHAIR', price: 450, image: '/product-3.jpg', category: 'Furniture', description: 'A comfortable lounge chair with a clean, modern shape.' },
    { id: '4', name: 'PENDANT LAMP', price: 250, image: '/product-4.jpg', category: 'Lighting', description: 'A pendant lamp with warm light, perfect for living rooms.' },
    { id: '5', name: 'WOODEN SIDE TABLE', price: 180, image: '/product-5.jpg', category: 'Furniture', description: 'A small side table made of solid wood with a natural finish.' },
    { id: '6', name: 'CERAMIC VASE SET', price: 120, image: '/product-6.jpg', category: 'Decor', description: 'A set of handmade ceramic vases in complementary shapes.' },
];
