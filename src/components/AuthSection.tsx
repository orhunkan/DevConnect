"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AuthSection() {
  const { data: session } = useSession();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // İlk render’da hiç bir şey gösterme

  return (
    <div className="text-center">
      {session ? (
        <>
          <p className="mb-2">Hoş geldin, {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Çıkış Yap
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("github")}
          className="bg-green-500 px-4 py-2 rounded"
        >
          GitHub ile Giriş Yap
        </button>
      )}
    </div>
  );
}
