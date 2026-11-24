
'use client'

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function MenuBar() {
  const { data: session } = useSession();

  return (
    <Menubar className="flex flex-col justify-left items-center gap-5 w-fit border-none bg-transparent shadow-none p-0">
      <MenubarMenu>
        <MenubarTrigger className="text-xs text-gray-300 hover:text-white transition-colors cursor-pointer">
          Shop
        </MenubarTrigger>

        <MenubarContent>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="text-xs text-gray-300 hover:text-white transition-colors cursor-pointer">
          About
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="text-xs text-gray-300 hover:text-white transition-colors cursor-pointer">
          Services
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="text-xs text-gray-300 hover:text-white transition-colors cursor-pointer">
          Contact
        </MenubarTrigger>
      </MenubarMenu>

      {session?.user && (
        <MenubarMenu >
          <MenubarTrigger className="cursor-pointer p-0  ">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/168073087?v=4" />
                    <AvatarFallback>
                      {session.user.name}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </HoverCardTrigger>

              <HoverCardContent>
                <span>{session.user.name}</span>
              </HoverCardContent>
            </HoverCard>
          </MenubarTrigger>
        </MenubarMenu>
      )}

    </Menubar>
  );
}
