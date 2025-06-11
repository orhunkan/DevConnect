"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authorEmail: session?.user?.email,
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/blog/${data._id}`); // ✅ Yeni yazıya yönlendir
    } else {
      alert("Bir hata oluştu.");
    }
  };

  if (!session)
    return <p className="text-center mt-20 text-white">Giriş yapman gerekiyor</p>;

  return (
    <div className="max-w-xl mx-auto p-4 text-white">
      <h1 className="text-2xl mb-4">Yeni Blog Yazısı</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-zinc-800"
        />
        <textarea
          placeholder="İçerik"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="p-2 rounded bg-zinc-800"
        />
        <input
          placeholder="Etiketler (virgülle)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="p-2 rounded bg-zinc-800"
        />
        <button className="bg-green-600 py-2 rounded" type="submit">
          Yayınla
        </button>
      </form>
    </div>
  );
}
