import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
    await connectToDB();

    // Kullanıcı var mı kontrol et
    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      await User.create({
        email: user.email,
        name: user.name,
        image: user.image,
      });
      console.log("✅ Yeni kullanıcı MongoDB’ye kaydedildi");
    } else {
      console.log("🟢 Kullanıcı zaten var");
    }

    return true;
  },
    async session({ session, token }) {
      // Mongo bağlantısı sadece ihtiyaç duyulursa yapılabilir
      await connectToDB();

      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  
});

export { handler as GET, handler as POST };
