import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import Post from "@/models/Post";
import { notFound } from "next/navigation";
import { fetchGitHubRepos } from "@/lib/github";
import ProfileSection from "@/components/ProfileSection";

interface Props {
  params: { username: string };
}

export default async function ProfilePage({ params }: Props) {
  await connectToDB();

  const userDoc = await User.findOne({ githubUsername: params.username }).lean();
  if (!userDoc) return notFound();

  const user = JSON.parse(JSON.stringify(userDoc));
  const repos = await fetchGitHubRepos(user.githubUsername);

  const postDocs = await Post.find({ authorEmail: user.email })
    .sort({ createdAt: -1 })
    .lean();

  const posts = JSON.parse(JSON.stringify(postDocs));

  return <ProfileSection user={user} repos={repos} posts={posts} />;
}
