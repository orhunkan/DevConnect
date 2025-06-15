"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditPostFormProps {
  id: string;
  initialTitle: string;
  initialContent: string;
  initialTags: string[];
}

export default function EditPostForm({
  id,
  initialTitle,
  initialContent,
  initialTags,
}: EditPostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState(initialTags.join(", "));
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
      }),
    });

    if (response.ok) {
      router.push(`/blog/${id}`);
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Edit Post</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Title"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 h-40"
        placeholder="Content"
        required
      />

      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Tags (comma separated)"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
