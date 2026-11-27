'use client'
import HeaderPage from '../Header/page';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaEye, FaCheckCircle } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaRegCopyright } from 'react-icons/fa6';
import {useSession} from 'next-auth/react';
import { useCart } from '../CartContext/Card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

// Sample product data
const products: Product[] = [
  { id: 1, name: 'HAUTEVILLE CONCRETE ROCKING CHAIR', price: 350, image: '/product-1.jpg', category: 'Furniture', description: 'A rocking chair made of concrete with a modern minimal design.' },
  { id: 2, name: 'PAVILION SPEAKER', price: 600, image: '/product-2.jpg', category: 'Audio', description: 'A wireless speaker with rich sound and an elegant look.' },
  { id: 3, name: 'MODERN LOUNGE CHAIR', price: 450, image: '/product-3.jpg', category: 'Furniture', description: 'A comfortable lounge chair with a clean, modern shape.' },
  { id: 4, name: 'PENDANT LAMP', price: 250, image: '/product-4.jpg', category: 'Lighting', description: 'A pendant lamp with warm light, perfect for living rooms.' },
  { id: 5, name: 'WOODEN SIDE TABLE', price: 180, image: '/product-5.jpg', category: 'Furniture', description: 'A small side table made of solid wood with a natural finish.' },
  { id: 6, name: 'CERAMIC VASE SET', price: 120, image: '/product-6.jpg', category: 'Decor', description: 'A set of handmade ceramic vases in complementary shapes.' },
];

export default function ShopPage(){
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const productRefs = useRef<(HTMLDivElement | null)[]>([]);
    const {data : session} = useSession();
    const { addToCart } = useCart();

    // محصولی که در دیالوگ مشخصات نمایش داده می‌شود
    const [quickView, setQuickView] = useState<Product | null>(null);

    // محصولی که تازه به سبد اضافه شده و در دیالوگ تایید نمایش داده می‌شود
    const [addedItem, setAddedItem] = useState<Product | null>(null);

    const handleAddToCart = (product: Product) => {
        if (!session?.user) {
            alert('please log in first!');
            return;
        }

        addToCart({
            id: String(product.id),
            name: product.name,
            price: product.price,
            image: product.image,
        });

        // تاخیر کوتاه تا اگر دیالوگ مشخصات باز بود، اول بسته شود
        setTimeout(() => setAddedItem(product), 150);
    };

    const setProductRef = (el: HTMLDivElement | null, index: number) => {
        productRefs.current[index] = el;
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = Number(entry.target.getAttribute('data-id'));
                    if (!visibleItems.includes(id)) {
                        // Add a small delay based on the product's index for sequential animation
                        setTimeout(() => {
                            setVisibleItems(prev => [...prev, id]);
                        }, 150 * (id - 1));
                    }
                }
            });
        }, { threshold: 0.2 });

        productRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            productRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [visibleItems]);

    return(
        <div className="min-h-screen bg-white">
            <HeaderPage />
            <div>
               <div>
                 <div className="relative min-w-[448px] min-h-[400px] overflow-hidden mx-auto ">
                     <Image
                         width={1200}
                         height={1200}
                         src={"/img_bg_2.jpg"}
                         alt="product image"
                         className="object-cover blur-[1px] min-w-[448px] min-h-[400px]"
                         style={{ objectPosition: "center" }}
                         priority
                     />
                     <div className='absolute inset-0 bg-black/10 flex flex-col justify-center text-5xl font-light text-white items-center'>
                         <h1>PRODUCTS</h1>
                     </div>
                 </div>
               </div>

                {/* Product Grid */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className={`group relative items-center justify-center flex flex-col transition-all duration-700  ${
                                    visibleItems.includes(product.id)
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10'
                                }`}
                                ref={(el) => setProductRef(el, index)}
                                data-id={product.id}
                            >
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={600}
                                        height={600}
                                        className="w-full h-auto object-cover"
                                        loading="lazy"
                                    />

                                    {/* Hover overlay with icons */}
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
                                        <button
                                            type="button"
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-amber-400 p-3 text-white hover:bg-white rounded-full hover:text-black transition-colors"
                                            aria-label="Add to cart"
                                        >
                                            <FaShoppingCart size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setQuickView(product)}
                                            className="bg-amber-400 p-3 text-white hover:bg-white rounded-full hover:text-black transition-colors"
                                            aria-label="Quick view"
                                        >
                                            <FaEye size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Product info */}
                                <div className="text-center mt-4">
                                    <h3 className="text-lg uppercase font-medium">{product.name}</h3>
                                    <p className="text-gray-500 mt-2">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-[100%] h-[300px] bg-amber-200 flex flex-col items-center gap-7   ">
              <h1 className="text-white text-2xl mt-4  ">NEWSLETTER</h1>
              <p className="font-light text-gray-500 ">just stay tune for our produt . now you can subscribe</p>

              <Input placeholder="Email..." className="w-[80%] inline-block mt-3"/>
              <Button className="border border-white w-[80%] mb-3 inline-block  bg-slate-800 text-white h-[50px] transition-all hover:bg-slate-600 cursor-pointer " >
                 Subscribe
              </Button>

           </div>

           <div className="mt-2 ml-2 ">

              <h2 className="font-bold mt-3 ">SHOP</h2>
              <p className="mt-2 font-light text-gray-500 mb-3">Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpa amet.</p>


             <div className="grid grid-cols-2 grid-rows-9 text-sm ">

                       <Link href={'#'}>About</Link>
                       <Link href={'#'}>Help</Link>
                       <Link href={'#'}>Contact</Link>
                       <Link href={'#'}>Terms</Link>
                       <Link href={'#'}>Meetups</Link>

                       <Link href={'#'}>Shop</Link>
                       <Link href={'#'}>Privacy</Link>
                       <Link href={'#'}>Testimonials</Link>
                       <Link href={'#'}>Handbook</Link>
                       <Link href={'#'}>Held Desk</Link>

                       <Link href={'#'}>Find Designers</Link>
                       <Link href={'#'}>Find Developers</Link>
                       <Link href={'#'}>Teams</Link>
                       <Link href={'#'}>Advertise</Link>
                       <Link href={'#'}>API</Link>
             </div>

           </div>

           <div className="flex flex-col items-center mb-3 mt-8 h-fit font-lig">
               <div className="flex flex-row items-center gap-2">
               <FaRegCopyright /> <span>2025 Sourena Arabyazdi & Mahshid Yargiv AllRight Reserved</span>
               </div>
               <span>Designed by <Link href={'#'} className="text-amber-200">FreeHtlm5</Link></span>

           </div>

           {/* Product quick view dialog */}
           <Dialog open={!!quickView} onOpenChange={(open) => { if (!open) setQuickView(null); }}>
               <DialogContent className="max-w-sm bg-white p-0 overflow-hidden">
                   {quickView && (
                       <div>
                           <Image
                               width={400}
                               height={300}
                               src={quickView.image}
                               alt={quickView.name}
                               className="w-full h-60 object-cover"
                           />
                           <div className="p-5">
                               <DialogHeader>
                                   <DialogTitle className="text-lg">{quickView.name}</DialogTitle>
                                   <DialogDescription>{quickView.category}</DialogDescription>
                               </DialogHeader>
                               <p className="mt-3 text-sm text-gray-600 font-light">{quickView.description}</p>
                               <p className="mt-3 text-amber-500 text-xl">${quickView.price}</p>
                               <Button
                                   className="mt-4 w-full bg-black text-white hover:bg-slate-900"
                                   onClick={() => {
                                       handleAddToCart(quickView);
                                       setQuickView(null);
                                   }}
                               >
                                   Add to cart
                               </Button>
                           </div>
                       </div>
                   )}
               </DialogContent>
           </Dialog>

           {/* Added to cart confirmation dialog */}
           <Dialog open={!!addedItem} onOpenChange={(open) => { if (!open) setAddedItem(null); }}>
               <DialogContent className="max-w-sm bg-white text-center">
                   {addedItem && (
                       <div className="flex flex-col items-center">
                           <FaCheckCircle size={48} className="text-green-500" />
                           <DialogHeader className="mt-4 items-center">
                               <DialogTitle className="text-lg">Added to cart!</DialogTitle>
                               <DialogDescription>
                                   {addedItem.name} has been added to your cart.
                               </DialogDescription>
                           </DialogHeader>
                           <Image
                               width={96}
                               height={96}
                               src={addedItem.image}
                               alt={addedItem.name}
                               className="mt-4 w-24 h-24 object-cover rounded"
                           />
                           <Button
                               className="mt-5 w-full bg-black text-white hover:bg-slate-900"
                               onClick={() => setAddedItem(null)}
                           >
                               Continue shopping
                           </Button>
                       </div>
                   )}
               </DialogContent>
           </Dialog>
        </div>
    )
}
