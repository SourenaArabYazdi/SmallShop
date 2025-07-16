'use client'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import MenuBar from './Menubar';
import { Input } from "@/components/ui/input";
import { IoIosMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { CiShoppingCart } from "react-icons/ci";


export default function DropDown() {



    return(
     <div className="mt-1 mr-1 cursor-pointer ">
    
         <Sheet >
          <SheetTrigger>
              <IoIosMenu className="cursor-pointer mr-[2rem] " />
          </SheetTrigger>
          
        <SheetContent className="bg-black text-white flex items-center flex-col w-[240x]  ">
          <SheetHeader>
            <SheetTitle className='sr-only'>Menu</SheetTitle>
            <SheetDescription className='sr-only'>
              A slide-out menu with navigation links and options.
            </SheetDescription>
          </SheetHeader>
                  <MenuBar />

                 
                 <div className=" min-h-screen relative mt-7">
                   <div className="mt-[8rem] flex items-center border border-gray-600">
                     <Input className="border-0 rounded-none max-w-[140px]" placeholder="Search..." />
                     <Button className="h-10 px-2 bg-transparent hover:bg-gray-800">
                       <CiSearch className="w-5 h-5" />
                     </Button>
                   </div>
                   
                   <div className="mt-4 flex items-center">
                     <Button className="flex items-center gap-2 bg-transparent hover:bg-gray-800">
                       <CiShoppingCart className="w-5 h-5 " />
                       
                        
                     </Button>
                   </div>
                 </div>
        </SheetContent>
      </Sheet>
       
     </div>
    )
}