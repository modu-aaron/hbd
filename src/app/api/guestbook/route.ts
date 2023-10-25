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

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const entry = await prisma.guestbook.delete({ where: { id } });
    return NextResponse.json({ message: "Success", entry }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error is occured" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { message, id } = await req.json();
    const entry = await prisma.guestbook.update({
      data: { message },
      where: { id },
    });
    return NextResponse.json({ message: "Success", entry }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error is occured" }, { status: 500 });
  }
}
