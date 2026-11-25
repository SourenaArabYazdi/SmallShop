'use client'

import DropDown from './MenuDropDown/page'

import { useEffect, useRef, useState } from 'react';
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

import { useSession, signOut } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';
import { useCart } from '../CartContext/Card';
import { products, Product } from './data/products';
import Image from 'next/image';


export default function HeaderPage() {

  const {
    cardItems,
    cartCount,
    cartTotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  // Cart dropdown
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Search
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleVerifyShopping = async () => {

  }

  // بستن دراپ‌دانلودها با کلیک بیرون از آن‌ها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (cartRef.current && !cartRef.current.contains(target)) {
        setCartOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const searchResults: Product[] = normalizedQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const handleAddFromSearch = (product: Product) => {
    if (!session?.user) {
      alert('please log in first!');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1500);
  };

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


        {/* Search Input + results dropdown */}

        <div ref={searchRef} className="relative shrink-0">

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchOpen(true);
            }}
            className="flex items-center border border-gray-300 rounded-md w-32 lg:w-44"
          >

            <Input
              className="border-0 h-9 min-w-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchOpen(false);
              }}
            />

            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 cursor-pointer hover:bg-gray-200"
            >
              <CiSearch className="w-5 h-5" />
            </Button>

          </form>

          {searchOpen && normalizedQuery && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-white text-black border border-gray-200 rounded-md shadow-lg z-50">

              {searchResults.length === 0 ? (
                <p className="p-4 text-sm font-light text-gray-500">
                  No products found for &quot;{query.trim()}&quot;
                </p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {searchResults.map((product) => (
                    <li key={product.id} className="flex items-center gap-3 p-3 hover:bg-gray-50">

                      <Link
                        href="/Website/Shop"
                        onClick={() => setSearchOpen(false)}
                        className="flex flex-1 items-center gap-3 min-w-0"
                      >
                        <Image
                          width={48}
                          height={48}
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                          <p className="text-sm text-amber-500">${product.price}</p>
                        </div>
                      </Link>

                      <Button
                        type="button"
                        onClick={() => handleAddFromSearch(product)}
                        className="h-8 px-3 shrink-0 text-xs bg-black text-white hover:bg-slate-900 cursor-pointer"
                      >
                        {justAddedId === product.id ? 'Added!' : 'Add'}
                      </Button>

                    </li>
                  ))}
                </ul>
              )}

            </div>
          )}

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


        {/* Shopping Cart dropdown */}

        <div ref={cartRef} className="relative">

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 cursor-pointer"
            onClick={() => setCartOpen((open) => !open)}
            aria-label="Shopping cart"
            aria-expanded={cartOpen}
          >

            <CiShoppingCart className="w-6 h-6" />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}

          </Button>

          {cartOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-white text-black border border-gray-200 rounded-md shadow-lg p-4 z-50">

              {cardItems.length === 0 ? (

                <p className="font-light text-black">
                  Your cart is empty
                </p>

              ) : (

                <div>

                  <h2 className="font-bold mb-3">
                    Your Cart
                  </h2>

                  <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">

                    {cardItems.map((item) => (

                      <li
                        key={item.lineKey}
                        className="flex items-center gap-3"
                      >

                        <Image
                          height={50}
                          width={50}
                          src={item.image}
                          className="rounded w-[50px] h-[50px] object-cover shrink-0"
                          alt={item.name}
                        />

                        <div className="flex-1 min-w-0">

                          <p className="font-medium text-sm truncate">
                            {item.name}
                          </p>

                          <p className="text-gray-500 text-sm">
                            ${item.price}
                          </p>

                          <div className="flex items-center gap-2 mt-1">

                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.lineKey)}
                              className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <FaMinus size={10} />
                            </button>

                            <span className="text-sm w-5 text-center">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.lineKey)}
                              className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <FaPlus size={10} />
                            </button>

                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.lineKey)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <FaTrash size={14} />
                        </button>

                      </li>

                    ))}

                  </ul>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">${cartTotal}</span>
                  </div>

                  <Button
                    type="button"
                    onClick={handleVerifyShopping}
                    className="border bg-black text-white font-light w-full mt-4 cursor-pointer hover:bg-slate-900 transition-all"
                  >
                    Continue & Purchase
                  </Button>

                </div>

              )}

            </div>
          )}

        </div>


        {/* Desktop User Avatar - account details on hover */}

        {session?.user && (

          <div className="hidden md:block">

            <div className="relative group">

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full cursor-pointer"
                aria-label="Account"
              >

                <Avatar className="h-8 w-8">

                  <AvatarImage
                    src={session.user.image ?? undefined}
                  />

                  <AvatarFallback>
                    {session.user.name?.charAt(0) ?? "U"}
                  </AvatarFallback>

                </Avatar>

              </Button>

              {/* pt-2 پلی بین آیکون و کارت است تا هاور قطع نشود */}
              <div className="absolute right-0 top-full pt-2 w-72 z-50 invisible opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">

                <div className="bg-white text-black border border-gray-200 rounded-md shadow-lg p-4">

                  <div className="flex items-center gap-3">

                    <Avatar className="h-14 w-14">

                      <AvatarImage
                        src={session.user.image ?? undefined}
                      />

                      <AvatarFallback>
                        {session.user.name?.charAt(0) ?? "U"}
                      </AvatarFallback>

                    </Avatar>

                    <div className="min-w-0">

                      <p className="font-semibold truncate">
                        {session.user.name ?? 'User'}
                      </p>

                      <p className="text-sm text-gray-500 truncate">
                        {session.user.email ?? 'No email'}
                      </p>

                    </div>

                  </div>

                  <Button
                    onClick={() => signOut()}
                    className="border bg-black text-white transition-all hover:bg-slate-950 cursor-pointer mt-4 w-full"
                  >
                    Sign Out
                  </Button>

                </div>

              </div>

            </div>

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
