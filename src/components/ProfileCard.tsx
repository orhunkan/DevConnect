// "use client";

// import { useSession } from "next-auth/react";

// export default function ProfileCard() {
//   const { data: session } = useSession();

//   if (!session?.user) return null;

//   return (
//     <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm text-center">
//       <img
//         src={session.user.image || "/default-avatar.png"}
//         alt="profil"
//         className="w-16 h-16 rounded-full mx-auto mb-2"
//       />
//       <h2 className="text-lg font-semibold text-blue-900">{session.user.name}</h2>
//       <p className="text-sm text-gray-500">{session.user.email}</p>
//     </div>
//   );
// }
