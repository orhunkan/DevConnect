import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();

  return NextResponse.json({ message: "Mongo bağlantısı başarılı!" });
}
