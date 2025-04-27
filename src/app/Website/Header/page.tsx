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

export default function HeaderPage(){ 
   const {data : session} = useSession();
   const router = useRouter();

    return(
      <div className='flex justify-between items-center mb-4 mt-2 px-1'>
          <span className='font-medium text-2xl'> Shop </span>
          <div className='inline-block ml-2 '>
            {!session?.user && (
               <Button onClick={() =>router.push('/Website/Forms/SignIn') } className='border bg-black text-white  ' >
                  SignIn
               </Button>
            )}
         </div>
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
                       <span>email:{session?.user?.email}</span>
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
            
            <Button variant="ghost" size="icon" className="h-9">
              <CiShoppingCart className="w-10 h-10" />
            </Button>
          </div>
      </div>
    )
}
