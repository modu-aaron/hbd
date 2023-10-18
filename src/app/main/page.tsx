import Cover from "@/components/shared/Cover";
import Title from "@/components/shared/Title";
import GuestBookView from "@/components/main/view";
import prisma from "@/lib/prisma";
import Admin from "@/components/main/Admin";

export default async function Home() {
  const getEntries = async () => {
    const data = await prisma.guestbook.findMany({
      take: 50,
      orderBy: {
        created_at: "asc",
      },
    });

    return data;
  };

  const data = await getEntries();
  return (
    <Cover>
      <Title title="Today`s Dahye BirthDay 🎉" />
      <div className="flex flex-1 max-[700px]:flex-col space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <Admin />
        {data && <GuestBookView data={data} />}
      </div>
    </Cover>
  );
}
