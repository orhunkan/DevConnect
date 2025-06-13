// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-blue-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Sol: Logo boş kutu tutucu (gerekirse logoyu koyarız) */}
        <div className="w-[100px]">
          <Link href="/" className="text-xl font-bold">
            DevConnect
          </Link>
        </div>

        {/* Orta: Menü Linkleri */}
        <nav className="flex gap-6 items-center justify-center">
          {/* <Link href="/" className="hover:underline">Anasayfa</Link> */}
          <Link href="/blog/new" className="hover:underline">Create Post </Link>
          <Link href="/blog/" className="hover:underline">Posts</Link>
          <Link href="" className="hover:underline">Explore</Link>
        </nav>

        {/* Sağ: Kullanıcı bilgisi */}
        <div className="w-[200px] flex justify-end items-center gap-2">
          {session?.user ? (
            <>
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt="profil"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="text-sm leading-tight hidden sm:block">
                <p className="font-semibold">{session.user.name}</p>
                <p className="text-xs text-zinc-200">{session.user.email}</p>
              </div>
            </>
          ) : (
            <Link href="/api/auth/signin">Giriş Yap</Link>
          )}
        </div>
      </div>
    </header>
  );
}
