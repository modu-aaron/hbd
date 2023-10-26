import Cover from "@/components/shared/Cover";
import Title from "@/components/shared/Title";
import GuestBookView from "@/components/main/view";
import prisma from "@/app/db";
import Admin from "@/components/main/Admin";
import Icon from "@/components/Icons/Icon";
import { getPost } from "../../../api/server/main";

export default async function Home() {
  const data = await getPost();
  // const getEntries = async () => {
  //   const data = await prisma.guestbook.findMany({
  //     take: 200,
  //     orderBy: {
  //       created_at: "desc",
  //     },
  //   });

  //   return data;
  // };

  // const data = await getEntries();

  const title = (
    <div className="flex items-center">
      Today is {Icon.SpongeIcon}DaHye`s BirthDay
    </div>
  );
  return (
    <Cover>
      <Title title={title} />
      <div className="flex flex-1 max-[700px]:flex-col space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <Admin />
        {data && <GuestBookView data={data} />}
      </div>
    </Cover>
  );
}
