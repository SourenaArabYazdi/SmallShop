
'use client'

import DropDown from './MenuDropDown/page'

import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

import { useSession, signOut } from 'next-auth/react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';
import { useCart } from '../CartContext/Card';
import Image from 'next/image';


export default function HeaderPage() {

  const { cardItems } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleVerifyShopping = async () => {

  }

  return (
    <header className="w-full flex items-center justify-between gap-3 px-3 sm:px-5 py-3">

      {/* Left Section - Logo */}

      <div className="shrink-0">
        <Link
          href="/Website"
          className="font-medium text-2xl cursor-pointer"
        >
          Shop
        </Link>
      </div>


      {/* Center Section - Navigation & Search */}

      <div className="hidden md:flex flex-1 items-center justify-center gap-4 lg:gap-6 min-w-0">

        <nav className="flex items-center gap-3 lg:gap-5 shrink-0">

          <Link
            href="/Website/Shop"
            className="hover:text-gray-600 font-light transition-colors"
          >
            Shop
          </Link>

          <Link
            href="#"
            className="hover:text-gray-600 font-light transition-colors"
          >
            About
          </Link>

          <Link
            href="#"
            className="hover:text-gray-600 font-light transition-colors"
          >
            Services
          </Link>

          <Link
            href="#"
            className="hover:text-gray-600 font-light transition-colors"
          >
            Contact
          </Link>

        </nav>


        {/* Search Input */}

        <div className="flex items-center border border-gray-300 rounded-md w-32 lg:w-44 shrink-0">

          <Input
            className="border-0 h-9 min-w-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search..."
          />

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 cursor-pointer hover:bg-gray-200"
          >
            <CiSearch className="w-5 h-5" />
          </Button>

        </div>

      </div>


      {/* Right Section - User Actions */}

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">

        {/* Sign In */}

        {!session?.user && (
          <Button
            onClick={() => router.push('/Website/Forms/SignIn')}
            className="h-9 min-w-[84px] px-4 bg-black text-white border rounded-md text-sm hover:bg-slate-900 transition-all"
          >
            Sign In
          </Button>
        )}


        {/* Shopping Cart */}

        <HoverCard>

          <HoverCardTrigger asChild>

            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 cursor-pointer"
            >

              <CiShoppingCart className="w-6 h-6" />

              {cardItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {cardItems.length}
                </span>
              )}

            </Button>

          </HoverCardTrigger>


          <HoverCardContent
            align="end"
            className="bg-white text-black border-gray-200 w-72"
          >

            {cardItems.length === 0 ? (

              <p className="font-light text-black">
                Your cart is empty
              </p>

            ) : (

              <form onSubmit={handleVerifyShopping}>

                <div>

                  <h2 className="font-bold mb-3">
                    Your Cart
                  </h2>

                  <ul className="space-y-3">

                    {cardItems.map((item) => (

                      <li
                        key={item.id}
                        className="flex items-center gap-3"
                      >

                        <Image
                          height={50}
                          width={50}
                          src={item.image}
                          className="rounded"
                          alt={item.name}
                        />

                        <div>

                          <p className="font-medium">
                            {item.name}
                          </p>

                          <p className="text-gray-500">
                            ${item.price}
                          </p>

                        </div>

                      </li>

                    ))}

                  </ul>

                  <Button
                    className="border bg-black text-white font-light w-full mt-4 cursor-pointer hover:bg-slate-900 transition-all"
                    type="submit"
                  >
                    Continue & Purchase
                  </Button>

                </div>

              </form>

            )}

          </HoverCardContent>

        </HoverCard>


        {/* Desktop User Avatar */}

        {session?.user && (

          <div className="hidden md:block">

            <HoverCard>

              <HoverCardTrigger asChild>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full cursor-pointer"
                >

                  <Avatar className="h-8 w-8">

                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/168073087?v=4"
                    />

                    <AvatarFallback>
                      {session.user.name?.charAt(0) ?? "U"}
                    </AvatarFallback>

                  </Avatar>

                </Button>

              </HoverCardTrigger>


              <HoverCardContent
                align="end"
                className="bg-white text-black border-none w-72"
              >

                <span>
                  Welcome {session.user.name}!
                </span>

                <p className="mt-2 text-sm">
                  Email: {session.user.email}
                </p>

                <Button
                  onClick={() => signOut()}
                  className="border bg-black text-white transition-all hover:bg-slate-950 cursor-pointer mt-3 w-full"
                >
                  Sign Out
                </Button>

              </HoverCardContent>

            </HoverCard>

          </div>

        )}


        {/* Mobile Menu */}

        <div className="md:hidden">
          <DropDown />
        </div>

      </div>

    </header>
  )
}
