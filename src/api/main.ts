"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

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
