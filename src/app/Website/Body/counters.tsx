'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { FaEye, FaShoppingCart, FaStore } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";
import { ReactNode } from "react";

interface CounterItemProps {
  icon: ReactNode;
  value: number;
  label: string;
  visible: boolean;
}

export default function Counter() { 
    const [visible, setVisible] = useState(false);
    const counterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.disconnect();
            }
        };
    }, []);

    return(
        <div className="relative mt-10    ">
            <Image 
                width={1400} 
                height={1400} 
                alt="backimg" 
                src={'/img_bg_5.jpg'}
                className="w-full h-screen object-cover 2xl:max-w-[2144px] 2xl:max-h-[500px]"
            />

            <div className="absolute inset-0 bg-white/80 flex items-center justify-center 2xl:max-w-[2144px] 2xl:max-h-[500px] ">
                <div ref={counterRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl px-4">
                    <CounterItem 
                        icon={<FaEye />} 
                        value={22070} 
                        label="CREATIVITY FUEL" 
                        visible={visible} 
                    />
                    <CounterItem 
                        icon={<FaShoppingCart />} 
                        value={450} 
                        label="HAPPY CLIENTS" 
                        visible={visible} 
                    />
                    <CounterItem 
                        icon={<FaStore />} 
                        value={700} 
                        label="ALL PRODUCTS" 
                        visible={visible} 
                    />
                    <CounterItem 
                        icon={<FaTrophy />} 
                        value={820} 
                        label="AWARDS RECEIVED" 
                        visible={visible} 
                    />
                </div>
            </div>
        </div>
    )
}

function CounterItem({ icon, value, label, visible }: CounterItemProps) {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        if (!visible) return;
        
        const duration = 2000; // 2 seconds
        const steps = 50;
        const increment = value / steps;
        const stepTime = duration / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, stepTime);
        
        return () => clearInterval(timer);
    }, [visible, value]);
    
    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md text-center  ">
            <div className="bg-amber-300 rounded-full p-4 mb-4 inline-flex items-center justify-center text-white text-2xl w-16 h-16">
                {icon}
            </div>
            <h2 className="text-4xl font-light mb-2">{count}</h2>
            <p className="text-gray-500 uppercase tracking-wider text-sm">{label}</p>
        </div>
    );
}