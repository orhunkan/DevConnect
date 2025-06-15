"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-blue-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* sol logo */}
        <div className="w-[100px]">
          <Link href="/" className="text-xl font-bold">
            DevConnect
          </Link>
        </div>

        {/* orta menü */}
        <nav className="flex gap-6 items-center justify-center">
          <Link href="/blog/new" className="hover:underline">
            Create Post
          </Link>
          <Link href="/blog/" className="hover:underline">
            Posts
          </Link>
        </nav>

        {/* sağ taraf */}
        <div className="w-[200px] flex justify-end items-center">
          {session?.user ? (
            <ProfileDropdown
              username={session.user.name || session.user.email!.split("@")[0]}
              avatar={session.user.image ?? null}
            />
          ) : (
            <Link href="/api/auth/signin" className="hover:underline">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
