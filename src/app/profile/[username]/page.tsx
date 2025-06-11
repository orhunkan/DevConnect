import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import { notFound } from "next/navigation";
import { fetchGitHubRepos } from "@/lib/github";

interface Props {
  params: { username: string };
}

export default async function ProfilePage({ params }: Props) {
  await connectToDB();
  const user = await User.findOne({ githubUsername: params.username });
  const repos = await fetchGitHubRepos(user.githubUsername);
  if (!user) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-10 text-white">
          {repos.length > 0 && (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">GitHub Reposu</h2>
        <ul className="space-y-3">
          {repos.map((repo, i) => (
            <li key={i} className="bg-zinc-800 p-4 rounded">
              <a href={repo.html_url} target="_blank" className="text-blue-400 text-lg font-semibold hover:underline">
                {repo.name}
              </a>
              {repo.description && <p className="text-sm text-zinc-300">{repo.description}</p>}
              <p className="text-xs text-zinc-500">⭐ {repo.stars}</p>
            </li>
          ))}
        </ul>
      </div>
    )}

      <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
      <p className="text-zinc-400 mb-4">{user.email}</p>
      <p className="mb-4">{user.bio || "Bio yazılmamış."}</p>

      <h2 className="text-xl font-semibold mb-1">Yetenekler</h2>
      <ul className="flex flex-wrap gap-2 mb-4">
        {user.skills?.length > 0 ? (
          user.skills.map((skill: string, i: number) => (
            <li key={i} className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </li>
          ))
        ) : (
          <p className="text-zinc-500">Henüz eklenmemiş</p>
        )}
      </ul>

      {user.githubUsername && (
        <a
          href={`https://github.com/${user.githubUsername}`}
          target="_blank"
          className="text-blue-400 underline"
        >
          GitHub Profili: @{user.githubUsername}
        </a>
      )}
    </div>
  );
}
