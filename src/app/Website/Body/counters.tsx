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

    return (
        <div className="relative w-full overflow-hidden rounded-xl my-12">
          {/* تصویر بک‌گراند */}
          <Image
            width={1400}
            height={400}
            alt="backimg"
            src="/img_bg_5.jpg"
            className="w-full h-[300px] md:h-[360px] object-cover"
          />
      
          {/* لایه روی تصویر */}
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center px-4">
            <div
              ref={counterRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full"
            >
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
      );

      function CounterItem({ icon, value, label, visible }: CounterItemProps) {
        const [count, setCount] = useState(0);
      
        useEffect(() => {
          if (!visible) return;
          const duration = 2000;
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
          <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="bg-amber-300 rounded-full p-3 mb-3 text-white text-xl w-14 h-14 flex items-center justify-center">
              {icon}
            </div>
            <h2 className="text-3xl font-semibold">{count}</h2>
            <p className="text-gray-500 text-xs uppercase mt-1">{label}</p>
          </div>
        );
      }