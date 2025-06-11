"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function EditProfilePage() {
  const { data: session } = useSession();
  const [bio, setBio] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🧠 Submit edildi"); // ← bu satırı ekle
    console.log("Session email:", session?.user?.email);

    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session?.user?.email,
        bio,
        githubUsername,
        skills: skills.split(",").map((s) => s.trim()),
      }),
    });

    alert("Profil güncellendi!");
  };

  if (!session) return <p>Giriş yapman gerekiyor.</p>;

  return (
    <div className="max-w-xl mx-auto p-4 text-white">
      <h1 className="text-2xl mb-4">Profilini Düzenle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          placeholder="Bio"
          className="p-2 rounded bg-zinc-800"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          placeholder="GitHub Kullanıcı Adı"
          className="p-2 rounded bg-zinc-800"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
        />
        <input
          placeholder="Yetenekler (virgülle ayır)"
          className="p-2 rounded bg-zinc-800"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <button type="submit" className="bg-green-600 py-2 rounded">
          Kaydet
        </button>
      </form>
    </div>
  );
}
