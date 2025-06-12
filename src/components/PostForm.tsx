"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
      }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Bir hata oluştu.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full text-gray-800">
      <h2 className="text-2xl font-bold">Yeni Post Oluştur</h2>

      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border rounded placeholder:text-gray-600"
        required
      />

      <textarea
        placeholder="İçerik"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border rounded h-40 placeholder:text-gray-600"
        required
      />

      <input
        type="text"
        placeholder="Etiketler (virgülle ayır)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-3 border rounded placeholder:text-gray-600"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Oluştur
      </button>
    </form>
  );
}
