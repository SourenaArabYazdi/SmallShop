'use client'
import { useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
export default function Home() {

  useEffect(() => {
    redirect("/Website")
  })
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href={'/Website'}>Website</Link>
    </div>
  );
}
