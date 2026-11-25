'use client'


import {createContext , useContext , useState , ReactNode} from 'react';

export interface CartItem {
    id : string;
    name : string;
    price : number;
    image : string;
}

// هر خط سبد خرید: محصول + تعداد
export interface CartLine extends CartItem {
    lineKey : string;
    quantity : number;
}

interface CardContextType {
     cardItems : CartLine[];
     cartCount : number;
     cartTotal : number;
     addToCart : (item : CartItem) => void;
     increaseQuantity : (lineKey : string) => void;
     decreaseQuantity : (lineKey : string) => void;
     removeFromCart : (lineKey : string) => void;
}



const CartContext = createContext<CardContextType | undefined>(undefined);

// صفحه اصلی و صفحه Shop برای محصولات متفاوت از idهای یکسان استفاده می‌کنند،
// برای همین خط سبد خرید با ترکیب id + name + price شناسایی می‌شود.
const makeLineKey = (item : CartItem) => `${item.id}|${item.name}|${item.price}`;


export const CartProvider = ({children} : {children : ReactNode}) => {
     const [cartItems , setCartItems] =  useState<CartLine[]>([]);

     const addToCart = (item : CartItem) =>  {
        const lineKey = makeLineKey(item);

        setCartItems(prevItems => {
            const exists = prevItems.some(line => line.lineKey === lineKey);

            if (exists) {
                return prevItems.map(line =>
                    line.lineKey === lineKey
                        ? { ...line, quantity: line.quantity + 1 }
                        : line
                );
            }

            return [...prevItems , { ...item, lineKey, quantity: 1 }];
        });
     };

     const increaseQuantity = (lineKey : string) => {
        setCartItems(prevItems =>
            prevItems.map(line =>
                line.lineKey === lineKey
                    ? { ...line, quantity: line.quantity + 1 }
                    : line
            )
        );
     };

     // اگر تعداد به صفر برسد، آیتم از سبد حذف می‌شود
     const decreaseQuantity = (lineKey : string) => {
        setCartItems(prevItems =>
            prevItems.flatMap(line => {
                if (line.lineKey !== lineKey) return [line];
                if (line.quantity > 1) return [{ ...line, quantity: line.quantity - 1 }];
                return [];
            })
        );
     };

     const removeFromCart = (lineKey : string) => {
        setCartItems(prevItems => prevItems.filter(line => line.lineKey !== lineKey));
     };

     const cartCount = cartItems.reduce((sum , line) => sum + line.quantity , 0);
     const cartTotal = cartItems.reduce((sum , line) => sum + line.price * line.quantity , 0);


     return(
        <CartContext.Provider
            value={{
                cardItems : cartItems,
                cartCount,
                cartTotal,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
            }}
        >
              {children}
        </CartContext.Provider>
     )
};


export const useCart = () =>  {
    const context = useContext(CartContext);
    if(!context) throw new Error('useCart must be used within a CartProvider')

    return context;
}
