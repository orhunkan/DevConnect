"use client";

import Navbar from "./Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (

    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-start mt-6 px-4">{children}</main>
    </div>
    
  );
}
