'use client'


import {createContext , useContext , useState , ReactNode} from 'react';

interface CartItem { 
    id : string;
    name : string;
    price : number;
    image : string;
}

interface CardContextType { 
     cardItems : CartItem[];
     addToCart : (item : CartItem) => void
}



const CartContext = createContext<CardContextType | undefined>(undefined);


export const CartProvider = ({children} : {children : ReactNode}) => {
     const [cartItems , setCartItems] =  useState<CartItem[]>([]);

     const addToCart = (item : CartItem) =>  {
        setCartItems(prevItems => [...prevItems , item]);
     };


     return(
        <CartContext.Provider value={{cardItems : cartItems, addToCart}}>
              {children}
        </CartContext.Provider>
     )
};


export const useCart = () =>  {
    const context = useContext(CartContext);
    if(!context) throw new Error('useCart must be used within a CartProvider')

    return context;
}