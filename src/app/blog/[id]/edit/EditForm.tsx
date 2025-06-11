"use client";

import { BlogPost } from "@/types/post";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags.join(", "));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/blog/${post._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
      }),
    });

    if (res.ok) {
      router.push(`/blog/${post._id}`);
    } else {
      alert("Bir hata oluştu.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 text-white">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded bg-zinc-800"
        placeholder="Başlık"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        className="p-2 rounded bg-zinc-800"
        placeholder="İçerik"
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="p-2 rounded bg-zinc-800"
        placeholder="Etiketler (virgülle)"
      />
      <button className="bg-blue-600 py-2 rounded" type="submit">Güncelle</button>
    </form>
  );
}
