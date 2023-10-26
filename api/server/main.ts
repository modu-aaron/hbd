"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/app/db";

export const getPost = async () => {
  "use server";

  const data = await prisma.guestbook.findMany({
    take: 200,
    orderBy: {
      created_at: "desc",
    },
  });

  revalidatePath("/");

  return data;
};

export const postEntry = async (formData: FormData) => {
  "use server";

  const data = await prisma.guestbook.create({
    data: {
      message: formData.get("entry") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    },
  });

  revalidatePath("/");
};

export const postUpdate = async (id: string, message: string) => {
  "use server";

  const data = await prisma.guestbook.update({
    data: { message },
    where: { id },
  });

  revalidatePath("/");
};

export const postDelete = async (id: string) => {
  "use server";

  const data = await prisma.guestbook.delete({
    where: { id },
  });

  revalidatePath("/");
};
