'use clinet'

import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";


  export default function MenuBar(){
    return(
      <div  >
        <div>
        <Menubar className="flex border-none flex-col   ">
           <MenubarMenu >
             <MenubarTrigger className="text-[12px] text-gray-300  mt-[5rem] mr-[9rem] hover:text-white transition-all "  >Shop</MenubarTrigger>
             <MenubarContent>
              
             </MenubarContent>


             <MenubarTrigger className="text-[12px]  text-gray-300 mr-[9rem]  hover:text-white transition-all" >
                 About
             </MenubarTrigger>

             <MenubarTrigger className="text-[12px]  text-gray-300 mr-[8.5rem]  hover:text-white transition-all" >
                 Services
             </MenubarTrigger>

             <MenubarTrigger className="text-[12px]  text-gray-300 mr-[8.5rem]  hover:text-white transition-all" >
                 Contact
             </MenubarTrigger>
           </MenubarMenu>
      </Menubar>
        </div>

       
      </div>
    )
  }