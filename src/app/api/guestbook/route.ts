import { NextResponse } from "next/server";
import { prisma } from "@/app/db";

export async function main() {
  try {
    await prisma.$connect();
    console.log("connect");
  } catch {
    return Error("DB Connection Error");
  }
}

export const GET = async () => {
  await main();
  try {
    const data = await prisma.guestbook.findMany();
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error is occured" }, { status: 500 });
  }
};
