'use client'
import HeaderPage from '../Header/page';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaRegCopyright } from 'react-icons/fa6';
// Sample product data
const products = [
  { id: 1, name: 'HAUTEVILLE CONCRETE ROCKING CHAIR', price: 350, image: '/product-1.jpg' },
  { id: 2, name: 'PAVILION SPEAKER', price: 600, image: '/product-2.jpg' },
  { id: 3, name: 'MODERN LOUNGE CHAIR', price: 450, image: '/product-3.jpg' },
  { id: 4, name: 'PENDANT LAMP', price: 250, image: '/product-4.jpg' },
  { id: 5, name: 'WOODEN SIDE TABLE', price: 180, image: '/product-5.jpg' },
  { id: 6, name: 'CERAMIC VASE SET', price: 120, image: '/product-6.jpg' },
];

export default function ShopPage(){ 
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const productRefs = useRef<(HTMLDivElement | null)[]>([]);
    
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
                         <h1>PRODUCT</h1>
                     </div>
                 </div>
               </div> 
                
                {/* Product Grid */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <div 
                                key={product.id} 
                                className={`group relative items-center justify-center flex flex-col transition-all duration-700 mr-10 ${
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
                                            className="bg-[#d4b943] p-3 text-white hover:bg-white hover:text-black transition-colors"
                                            aria-label="Add to cart"
                                        >
                                            <FaShoppingCart size={20} />
                                        </button>
                                        <button 
                                            className="bg-[#d4b943] p-3 text-white hover:bg-white hover:text-black transition-colors"
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
              <h1 className="text-white text-2xl mt-4 mr-10 ">NEWSLETTER</h1>
              <p className="font-light text-gray-500 mr-10">just stay tune for our produt . now you can subscribe</p>

              <Input placeholder="Email..." className="w-[80%] inline-block mt-3 mr-10"/>
              <Button className="border border-white w-[80%] mb-3 inline-block  bg-slate-800 text-white h-[50px] transition-all hover:bg-slate-600 cursor-pointer mr-10" >
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
               <FaRegCopyright /> <span>2025 Soren AllRight Reserved</span>
               </div>
               <span>Designed by <Link href={'#'} className="text-amber-200">FreeHtlm5</Link></span>

           </div>
        </div>
    )
}