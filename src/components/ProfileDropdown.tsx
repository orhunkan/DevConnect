"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function ProfileDropdown({
  username,
  avatar,
}: {
  username: string;
  avatar: string | null;
}) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  /* dışarı tıklayınca kapat */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  /* sade SVG ikon helper’ı */
  const Icon = ({ path }: { path: string }) => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );

  return (
    <div className="relative" ref={boxRef}>
      {/* trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        <img
          src={avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="hidden sm:block text-sm">{username}</span>
        <Icon path="M19 9l-7 7-7-7" />
      </button>

      {/* dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded shadow-lg z-50">
          <Link
            href={`/profile/${username}`}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
          >
            <Icon path="M5.121 17.804A10.97 10.97 0 0112 15c2.485 0 4.779.808 6.879 2.157M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            Profilim
          </Link>


          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50"
          >
            <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V7" />
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}
