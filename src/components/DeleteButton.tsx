'use client';

import { deletePost } from "@/app/actions/deletePost";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    const confirmDelete = confirm("Bu yazıyı silmek istediğine emin misin?");
    if (confirmDelete) {
      await deletePost(id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-sm text-red-400 hover:underline"
    >
      🗑️ Yazıyı Sil
    </button>
  );
}
