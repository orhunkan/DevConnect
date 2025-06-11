export interface GitHubRepo {
  name: string;
  html_url: string;
  description: string;
  stars: number;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) throw new Error("GitHub verisi alınamadı");

    const data: GitHubRepo[] = await res.json();

    return data.map((repo) => ({
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      stars: repo.stars,
    }));
  } catch (error) {
    console.error("GitHub API hatası:", error);
    return [];
  }
}
