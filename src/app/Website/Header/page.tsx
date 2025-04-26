import DropDown from './MenuDropDown/page'
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function HeaderPage(){ 
    return(
      <div className='flex justify-between items-center mb-4 mt-2 px-1'>
          <span className='font-medium text-2xl'> Shop </span>
          
          {/* Mobile Menu (visible on small screens) */}
          <div className="md:hidden lg:hidden xl:hidden">
            <DropDown />
          </div>
          
          {/* Desktop Navigation (visible on md screens and up) */}
          <div className="hidden md:flex items-center space-x-6 mt-2 ">
            <nav className="flex items-center  space-x-6 mr-4">
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
