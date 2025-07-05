'use client'

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
  import {useSession} from 'next-auth/react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


  export default function MenuBar(){

    const {data : session} = useSession();
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
             </MenubarTrigger><br />
             <br /> <br /><br />

             <MenubarTrigger>
             <div >
             {session?.user && (
                 <HoverCard>
                   <HoverCardTrigger > 
                      <Button>
                         <Avatar >
                             <AvatarImage src = {'https://avatars.githubusercontent.com/u/168073087?v=4'} />
                             <AvatarFallback >{session?.user?.name}</AvatarFallback>
                         </Avatar>
                      </Button>
                   </HoverCardTrigger>

                   <HoverCardContent > 
                       <span>{session?.user?.name}</span>
                   </HoverCardContent>
                 </HoverCard>
              )}
          
         </div>  
             </MenubarTrigger>
           </MenubarMenu>
      </Menubar>
        </div>

       
      </div>
    )
  }