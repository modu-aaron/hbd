import { NextResponse } from "next/server";
import prisma from "@/app/db";

export const GET = async () => {
  try {
    const data = await prisma.guestbook.findMany();
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error is occured" }, { status: 500 });
  }
};
