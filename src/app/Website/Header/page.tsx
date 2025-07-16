'use client'

import DropDown from './MenuDropDown/page'
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {useSession} from 'next-auth/react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import { useCart } from '../CartContext/Card';
import Image from 'next/image';

export default function HeaderPage(){ 
  const {cardItems} = useCart();
   const {data : session} = useSession();
   const router = useRouter();



   const handleVerifyShopping = async () =>  {
     
   }

    return(
      <div className='flex justify-between items-center mb-4 mt-2 px-1 w-full'>
          <span className='font-medium text-2xl'> Shop </span>
          {/* Responsive Sign In Button */}
          <div className='inline-block ml-2'>
            {!session?.user && (
               <Button 
                 onClick={() =>router.push('/Website/Forms/SignIn') }
                 className='border bg-black text-white mr-2 md:mr-10 px-4 py-2 text-sm md:text-base w-auto min-w-[80px] md:min-w-[120px] rounded transition-all duration-200'
               >
                  Sign In
               </Button>
            )}
         </div>
         {/* Responsive Avatar for logged in user */}
         
            <div className=' hidden md:flex md:ml-[17rem] md:mt-[7px] lg:flex lg:ml-[32rem] lg:mt-[7px] xlg:flex xlg:ml-[24rem] xlg:mt-[7px] 2xlg:flex 2xlg:ml-[34rem] 2xlg:mt-[7px] '>
             {session?.user && (
                 <HoverCard >
                   <HoverCardTrigger > 
                      <Button>
                         <Avatar>
                             <AvatarImage src = {'https://avatars.githubusercontent.com/u/168073087?v=4'} />
                             <AvatarFallback>{session?.user?.name}</AvatarFallback>
                         </Avatar>
                      </Button>
                   </HoverCardTrigger>

                   <HoverCardContent className='bg-white text-black border-none  min-w-[300px] ' > 
                       <span>Welcome {session?.user?.name}!</span> <br />
                       <span>email: <span className='font-light'>{session?.user?.email} </span></span>
                       <Button onClick={() => signOut()} className='border bg-black text-white transition-all hover:bg-slate-950 cursor-pointer mt-3 w-full'>
                         Sign Out
                       </Button>
                   </HoverCardContent>
                 </HoverCard>
              )}
          
         </div>

        
         
          {/* Mobile Menu (visible on small screens) */}
          <div className="md:hidden lg:hidden xl:hidden">
            <DropDown />
          </div>
          
          {/* Desktop Navigation (visible on md screens and up) */}
          <div className="hidden md:flex items-center space-x-6 mt-2 ">
            <nav className="flex items-center  space-x-6 mr-2">
           
              <Link href="/Website/Shop" className="hover:text-gray-600 font-light transition-colors">Shop</Link>
              <Link href="#" className="hover:text-gray-600 font-light transition-colors">About</Link>
              <Link href="#" className="hover:text-gray-600 font-light transition-colors">Services</Link>
              <Link href="#" className="hover:text-gray-600 font-light transition-colors">Contact</Link>
              
            </nav>
            
            <div className="flex items-center border border-gray-300 rounded-md">
              <Input className="border-0 h-9 w-30" placeholder="Search..." />
              <Button variant="ghost" size="icon" className="h-9 px-2 cursor-pointer hover:bg-gray-200 transition-all">
                <CiSearch className="w-5 h-5" />
              </Button>
            </div>
            
            <HoverCard >
                <HoverCardTrigger>
                <Button variant="ghost" size="icon" className="h-9 cursor-pointer mr-4">
                   <CiShoppingCart className="w-10 h-10  " />
                   {cardItems.length > 0 &&(
                     <span className='absolute top-0 right-0 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                       {cardItems.length}
                     </span>
                   )}
                 </Button>
                </HoverCardTrigger>

                <HoverCardContent className='bg-white text-black border-gray-200 mr-4'>
                    {cardItems.length === 0 ? (
                      <p className='font-light text-black'>your cart is empty</p>
                    ) : (
                      <form onSubmit={handleVerifyShopping}>
                        <div>
                        <h2 className='font-bold mb-2'>your Cart</h2>
                        <ul className='space-y-2'>
                           {cardItems.map(item => (
                             <li key={item.id} className='flex items-center gap-3'>
                                <Image height={50} width={50} src={item.image} className='rounded' alt={item.name} />
                                <div>
                                   <p className='font-medium'>{item.name}</p>
                                   <p className='text-gray-500'>${item.price}</p>
                                </div>
                             </li>
                           ))}
                        </ul>
                        <Button className='border bg-black text-white font-light w-full mt-3 cursor-pointer hover:bg-slate-900 transition-all' type='submit'>Continue & Purshase</Button>
                      </div>
                      </form>
                    )}
                </HoverCardContent>
            </HoverCard>
          </div>
      </div>
    )
}
