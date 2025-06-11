// src/app/page.tsx
import AuthSection from "@/components/AuthSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white bg-zinc-900">
      <h1 className="text-3xl mb-4">DevConnect 🚀</h1>
      <AuthSection />
    </main>
  );
}
