import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
export async function PATCH(req: NextRequest) {
  await connectToDB();
  const body = await req.json();
  const { email, bio, githubUsername, skills } = body;

  try {
    console.log("Mongo güncellemesi başlıyor");
    const user = await User.findOneAndUpdate(
      { email },
      {
        bio: bio,
        githubUsername: githubUsername,
        skills: skills,
      },
      {
        new: true,
        runValidators: true,
      }
    );


    if (!user) {
      console.log("❌ Kullanıcı bulunamadı.");
      return NextResponse.json({ message: "Kullanıcı bulunamadı." }, { status: 404 });
    }

    console.log("✅ Mongo güncellendi:", user);
    return NextResponse.json({ message: "Güncellendi", user });
  } catch (error) {
    console.error("🔥 Hata:", error);
    return NextResponse.json({ message: "Hata var." }, { status: 500 });
  }
}

