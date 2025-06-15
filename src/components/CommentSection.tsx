"use client";

import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  authorEmail: string;
  content: string;
  createdAt: string;
}

export default function CommentSection({
  postId,
  userEmail,
}: {
  postId: string;
  userEmail?: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  /* Yorumları çek */
  useEffect(() => {
    fetch(`/api/blog/${postId}/comments`)
      .then((r) => r.json())
      .then(setComments);
  }, [postId]);

  const addComment = async () => {
    if (!value.trim()) return;
    setLoading(true);

    const res = await fetch(`/api/blog/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: value }),
    });

    if (res.ok) {
      const newCmnt = await res.json();
      setComments((prev) => [newCmnt, ...prev]);
      setValue("");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Yorum yazma kutusu */}
      {userEmail ? (
        <div className="flex gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 border border-zinc-300 rounded p-2 text-sm"
            placeholder="Yorumunu yaz..."
          />
          <button
            onClick={addComment}
            disabled={loading}
            className="bg-blue-600 text-white px-3 py-2 rounded text-sm disabled:opacity-50"
          >
            Send
          </button>
        </div>
      ) : (
        <p className="text-sm text-zinc-500">
          You have to log in to be able to write down comments.
        </p>
      )}

      {/* Yorum listesi */}
      <div className="space-y-3">
        {comments.map((c) => (
          <div
            key={c._id}
            className="border border-zinc-200 bg-white rounded p-3 text-sm shadow-sm"
          >
            <p className="font-medium text-zinc-800">{c.authorEmail}</p>
            <p className="text-zinc-600 whitespace-pre-wrap">{c.content}</p>
            <p className="mt-1 text-xs text-zinc-400">
              {new Date(c.createdAt).toLocaleString("tr-TR")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
