import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const id = req.url.split("/guestbook/")[1];
    const entry = await prisma.guestbook.delete({ where: { id } });
    return NextResponse.json({ message: "Success", entry }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error is occured" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const id = req.url.split("/guestbook/")[1];
    const { message } = await req.json();
    const entry = await prisma.guestbook.update({
      data: { message },
      where: { id },
    });
    return NextResponse.json({ message: "Success", entry }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error is occured" }, { status: 500 });
  }
}
