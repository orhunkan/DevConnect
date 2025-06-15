"use client";

import Image from "next/image";
import PostCard from "./PostCard"; // varsa, yoksa haber et
import { UserType } from "@/models/User";

interface Repo {
  name: string;
  description: string;
  html_url: string;
}

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
  authorEmail:string;
}

export default function ProfileSection({
  user,
  repos,
  posts,
}: {
  user: UserType;
  repos: Repo[];
  posts: BlogPost[];
}) {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-12">
      {/* Üst Bilgiler */}
      <div className="bg-blue-100/60 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 w-full">
          <h2 className="text-2xl font-semibold text-zinc-800 break-words">
            {user.email}
          </h2>

          {user.githubUsername && (
            <a
              href={`https://github.com/${user.githubUsername}`}
              target="_blank"
              className="text-blue-500 hover:underline text-lg"
            >
              GitHub Profili: @{user.githubUsername}
            </a>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {Array.isArray(user.skills) &&
              user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-400 text-white text-sm font-medium px-4 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>

        {user.image && (
          <Image
            src={user.image}
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full border-2 border-zinc-400"
          />
        )}
      </div>

      {/* Repos */}
      <div>
        <h3 className="text-xl font-bold text-center mb-6">Repos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-blue-400 p-6 rounded-xl">
          {repos.map((repo, i) => (
            <a
              key={i}
              href={repo.html_url}
              target="_blank"
              className="bg-white rounded-lg p-4 hover:shadow-md transition"
            >
              <h4 className="text-lg font-bold text-zinc-800">{repo.name}</h4>
              <p className="text-sm text-zinc-600">
                {repo.description || "No description."}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Blog Postlar */}
      {posts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-center mb-6">Your posts</h3>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                title={post.title}
                content={post.content}
                tags={post.tags}
                createdAt={post.createdAt}
                likes={post.likes}
                comments={post.comments}
                authorEmail={post.authorEmail}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
