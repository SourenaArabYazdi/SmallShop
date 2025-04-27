'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image"
import { CiCreditCard1 } from "react-icons/ci";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import Counter from './counters';
import Link from "next/link";
import { FaRegCopyright } from "react-icons/fa6";


export default function BodyPage() {
    const [visibleSections, setVisibleSections] = useState({
        creditCard: false,
        saveMoney: false,
        freeDelivery: false,
        product1: false,
        product2: false,
        product3: false,
        product4: false,
        testimonials: false
    });
    

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const testimonialsRef = useRef(null);
    const sliderRef = useRef(null);
    const startX = useRef(0);
    const isDragging = useRef(false);
    const [touchPosition, setTouchPosition] = useState<number | null>(null);

    const testimonials = [
        {
            id: 1,
            name: "JEAN DOE",
            platform: "TWITTER",
            image: "/person1.jpg",
            text: "\"Far far away, behind the word mountains, far from the countries, vokalia and Consontantia, there live the blind texts, separated they live in Bookmarksgrove right at the coast.\""
        },
        {
            id: 2,
            name: "JOHN DOE",
            platform: "TWITTER",
            image: "/person2.jpg",
            text: "\"Far far away, behind the word mountains, far from the countries, vokalia and Consontantia, there live the blind texts, separated they live in.\""
        },
        {
            id: 3,
            name: "JANE DOE",
            platform: "TWITTER",
            image: "/person3.jpg",
            text: "\"Far far away, behind the word mountains, far from the countries, vokalia.\""
        }
    ];

    const creditCardRef = useRef(null);
    const saveMoneyRef = useRef(null);
    const freeDeliveryRef = useRef(null);
    const product1Ref = useRef(null);
    const product2Ref = useRef(null);
    const product3Ref = useRef(null);
    const product4Ref = useRef(null);

    const handleDragStart = (e: React.MouseEvent) => {
        isDragging.current = true;
        startX.current = e.clientX;
    };

    const handleDragMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const currentX = e.clientX;
        const diff = startX.current - currentX;
        
        if (diff > 50) {
            handleNextTestimonial();
            isDragging.current = false;
        } else if (diff < -50) {
            handlePrevTestimonial();
            isDragging.current = false;
        }
    };

    const handleDragEnd = () => {
        isDragging.current = false;
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchPosition === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchPosition - currentTouch;

        if (diff > 50) {
            handleNextTestimonial();
            setTouchPosition(null);
        } else if (diff < -50) {
            handlePrevTestimonial();
            setTouchPosition(null);
        }
    };

    const handleNextTestimonial = () => {
        setCurrentTestimonial(prev => 
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const handlePrevTestimonial = () => {
        setCurrentTestimonial(prev => 
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === creditCardRef.current && entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, creditCard: true }));
                } else if (entry.target === saveMoneyRef.current && entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, saveMoney: true }));
                } else if (entry.target === freeDeliveryRef.current && entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, freeDelivery: true }));
                } else if (entry.target === product1Ref.current && entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, product1: true }));
                } else if (entry.target === product2Ref.current && entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, product2: true }));
                } else if (entry.target === product3Ref.current && entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, product3: true }));
                } else if (entry.target === product4Ref.current && entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, product4: true }));
                } else if (entry.target === testimonialsRef.current && entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, testimonials: true }));
                }
            });
        }, options);

        // Observe refs
        if (creditCardRef.current) observer.observe(creditCardRef.current);
        if (saveMoneyRef.current) observer.observe(saveMoneyRef.current);
        if (freeDeliveryRef.current) observer.observe(freeDeliveryRef.current);
        if (product1Ref.current) observer.observe(product1Ref.current);
        if (product2Ref.current) observer.observe(product2Ref.current);
        if (product3Ref.current) observer.observe(product3Ref.current);
        if (product4Ref.current) observer.observe(product4Ref.current);
        if (testimonialsRef.current) observer.observe(testimonialsRef.current);

        return () => {
            if (creditCardRef.current) observer.unobserve(creditCardRef.current);
            if (saveMoneyRef.current) observer.unobserve(saveMoneyRef.current);
            if (freeDeliveryRef.current) observer.unobserve(freeDeliveryRef.current);
            if (product1Ref.current) observer.unobserve(product1Ref.current);
            if (product2Ref.current) observer.unobserve(product2Ref.current);
            if (product3Ref.current) observer.unobserve(product3Ref.current);
            if (product4Ref.current) observer.unobserve(product4Ref.current);
            if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
        };
    }, []);

   

    return(
        <div>
            <div>
                 <div className="relative w-full h-screen overflow-hidden ">
                     <Image
                         width={1200}
                         height={1200}
                         src={"/img_bg_2.jpg"}
                         alt="product image"
                         className="object-cover w-full h-full"
                         style={{ objectPosition: "center" }}
                         priority
                     />
                     
                     <div className="absolute inset-0 bg-black/10 flex flex-col justify-center  ">
                         <div className="bg-white/80 p-8 mx-4 md:mx-20 max-w-md md:w-[690px] md:h-[324px]">
                             <p className="text-gray-500 mb-2">$530</p>
                             <h1 className="text-4xl  uppercase mb-4">THE HALUZ ROCKING CHAIR</h1>
                             <p className="text-gray-500 font-light mb-6 ">
                                 Far far away, behind the word mountains, far from the countries
                                 Vokalia and Consonantia, there live the blind texts. Separated they
                                 live in Bookmarksgrove.
                             </p>
                             <button className="border border-amber-400 text-amber-400 px-6 py-2 hover:bg-amber-400 hover:text-white transition-colors">
                                 Purchase Now
                             </button>
                         </div>
                     </div>
                 </div>
            </div>
            

            <div className="w-full h-screen flex flex-col 2xl:min-w-[2144px] 2xl:max-h-[646px] lg:max-h-[646px] justify-center items-center xl:flex xl:justify-center xl:flex-row xl:items-center  gap-10 bg-gray-100 md:grid md:grid-cols-3 md:grid-rows-1 lg:flex lg:flex-row lg:justify-center lg:items-center  2xl:flex 2xl:items-center 2xl:justify-center 2xl:flex-row md:justify-center md:items-center ">
               
                    <div 
                        ref={creditCardRef} 
                        className={`w-[90%] md:max-w-[249px] md:m-0 md:w-full md:h-[476px]    flex flex-col justify-center h-fit items-center mt-[6rem] transition-opacity duration-700 ${visibleSections.creditCard ? 'opacity-100' : 'opacity-0'}`}
                    >
                      
                       <span>  <CiCreditCard1 size={55} className="bg-amber-200 rounded-full w-[90px] h-[90px] p-2 text-white mt-3"/>  </span>
                       <span className="mt-5">CREDIT CARD</span>
                        
                        <p className="font-light w-[400px] mt-5 md:w-[179px] md:h-[163px]">
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
                        </p>

                        <Button className="mt-5 border-amber-200 border-2 text-amber-300 rounded-none w-[120px] h-[45px] hover:border-amber-300 mb-3">
                            Learn More
                        </Button>

                    </div>

                    <div 
                        ref={saveMoneyRef} 
                        className={`w-[90%] md:max-w-[249px] md:m-0 md:h-[476px] md:w-full   flex flex-col justify-center h-fit items-center mt-1 transition-opacity duration-700 ${visibleSections.saveMoney ? 'opacity-100' : 'opacity-0'}`}
                    >
                      
                       <span>  <FaMoneyCheckDollar size={55} className="bg-amber-200 rounded-full w-[90px] h-[90px] p-2 text-white mt-3"/>  </span>
                       <span className="mt-5">SAVE MONEY</span>
                        
                        <p className="font-light w-[400px] mt-5 md:w-[179px] md:h-[163px]">
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
                        </p>

                        <Button className="mt-5 border-amber-200 border-2 text-amber-300 rounded-none w-[120px] h-[45px] hover:border-amber-300 mb-3">
                            Learn More
                        </Button>

                    </div>


                    <div 
                        ref={freeDeliveryRef} 
                        className={`w-[90%] md:max-w-[249px] md:m-0 md:h-[476px]  md:w-full  flex flex-col justify-center mb-[6rem] h-auto items-center mt-6  transition-opacity duration-700 ${visibleSections.freeDelivery ? 'opacity-100' : 'opacity-0'}`}
                    >
                      
                       <span>  <FaTelegramPlane size={20} className="bg-amber-200 rounded-full w-[90px] h-[90px]  p-2 text-white mt-3"/>  </span>
                       <span className="mt-5">FREE DELIVERY</span>
                        
                        <p className="font-light w-[400px] mt-5 md:w-[179px] md:h-[163px]">
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
                        </p>

                        <Button className="mt-5 border-amber-200 border-2 text-amber-300 rounded-none w-[120px] h-[45px] hover:border-amber-300 mb-3">
                            Learn More
                        </Button>

                    </div>
            </div>

            <div className="w-full min-h-screen flex flex-col items-center mt-10 ">
                <div className="h-[200px] w-[90%] flex flex-col items-center">
                    <span className="text-md text-gray-400 font-semibold">COOL STUFF</span>
                    <span className="mt-2 text-3xl">PRODUCTS</span>
                    <p className="mt-6 font-light text-gray-400">
                    Dignissimos asperiores vitae velit veniam totam fuga molestias  <br /> <span className="ml-10">alias autem provident. Odit ab aliquam dolor eius</span>
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] max-w-7xl mt-10">
                    <div 
                        ref={product1Ref}
                        className={`group relative flex flex-col items-center overflow-hidden mb-10 transition-all duration-700 ${visibleSections.product1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div className="relative w-full h-[350px] overflow-hidden">
                            <Image 
                                width={500} 
                                height={500} 
                                alt="Hauteville Chair" 
                                src={'/product-1.jpg'} 
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                <a href="#" className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:bg-amber-500" aria-label="Quick view">
                                    <FaEye size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:bg-amber-500" aria-label="Add to cart">
                                    <FaShoppingCart size={18} />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <span className="text-gray-700 text-center mb-1">HAUTEVILLE CONCRETE ROCKING CHAIR</span>
                            <span className="text-amber-400 font-light">$350</span>
                        </div>
                    </div>
                    
                    <div 
                        ref={product2Ref}
                        className={`group relative flex flex-col items-center overflow-hidden mb-10 transition-all duration-700 ${visibleSections.product2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div className="relative w-full h-[350px] overflow-hidden">
                            <Image 
                                width={500} 
                                height={500} 
                                alt="Modern Chair" 
                                src={'/product-2.jpg'} 
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                <a href="#" className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:bg-amber-500" aria-label="Quick view">
                                    <FaEye size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:bg-amber-500" aria-label="Add to cart">
                                    <FaShoppingCart size={18} />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <span className="text-gray-700 text-center mb-1">PAVILION SPEAKER</span>
                            <span className="text-amber-400 font-light">$450</span>
                        </div>
                    </div>
                    
                    <div 
                        ref={product3Ref}
                        className={`group relative flex flex-col items-center overflow-hidden mb-10 transition-all duration-700 ${visibleSections.product3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div className="relative w-full h-[350px] overflow-hidden">
                            <Image 
                                width={500} 
                                height={500} 
                                alt="Stylish Chair" 
                                src={'/product-3.jpg'} 
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                <a href="#" className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:bg-amber-500" aria-label="Quick view">
                                    <FaEye size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:bg-amber-500" aria-label="Add to cart">
                                    <FaShoppingCart size={18} />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <span className="text-gray-700 text-center mb-1">LIGOMANCER PENDANT LAMP</span>
                            <span className="text-amber-400 font-light">$300</span>
                        </div>
                    </div>

                    <div 
                        ref={product4Ref}
                        className={`group relative flex flex-col items-center overflow-hidden mb-10 transition-all duration-700 ${visibleSections.product4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div className="relative w-full h-[350px] overflow-hidden">
                            <Image 
                                width={500} 
                                height={500} 
                                alt="Stylish Chair" 
                                src={'/product-4.jpg'} 
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                <a href="#" className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:bg-amber-500" aria-label="Quick view">
                                    <FaEye size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:bg-amber-500" aria-label="Add to cart">
                                    <FaShoppingCart size={18} />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <span className="text-gray-700 text-center mb-1">LIGOMANCER PENDANT LAMP</span>
                            <span className="text-amber-400 font-light">$300</span>
                        </div>
                    </div>
                </div>
            </div>
             
            <div 
                ref={testimonialsRef}
                className={`w-full min-h-auto bg-gray-100 flex flex-col mt-[3rem]   items-center transition-opacity duration-1000 ${visibleSections.testimonials ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="h-[200px] w-[90%] flex flex-col items-center pt-14">
                    <span className="font-light text-gray-400">TESTIMONY</span>
                    <span className="text-3xl font-medium mt-2">HAPPY CLIENTS</span>
                </div>

                <div 
                    ref={sliderRef}
                    className="w-full relative overflow-hidden"
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div 
                        className="flex transition-transform duration-500 ease-in-out w-full"
                        style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={testimonial.id} 
                                className="min-w-full flex flex-col items-center px-4 "
                            >
                                <div className="w-full max-w-2xl flex flex-col items-center">
                                    <Image 
                                        width={110} 
                                        height={110} 
                                        alt={`Avatar of ${testimonial.name}`} 
                                        src={testimonial.image} 
                                        className="rounded-full h-28 w-28 object-cover"
                                        loading="lazy"
                                    />
                                    <span className="font-light text-gray-400 mt-4">
                                        {testimonial.name}, VIA <span className="text-amber-400">{testimonial.platform}</span>
                                    </span>
                                    <p className="font-light text-gray-500 mt-7 text-center max-w-xl">
                                        {testimonial.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-10 gap-2 mb-7 ">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === index ? 'bg-amber-400' : 'bg-gray-300'}`}
                            onClick={() => setCurrentTestimonial(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

           <Counter />


           <div className="w-[100%] h-[300px] bg-amber-200 flex flex-col items-center gap-7">
              <h1 className="text-white text-2xl mt-4">NEWSLETTER</h1>
              <p className="font-light text-gray-500">just stay tune for our produt . now you can subscribe</p>

              <Input placeholder="Email..." className="w-[80%] inline-block mt-3"/>
              <Button className="border border-white w-[80%] mb-3 inline-block  bg-slate-800 text-white h-[50px] transition-all hover:bg-slate-600 cursor-pointer" >
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