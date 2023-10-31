import Cover from "@/components/shared/Cover";
import Title from "@/components/shared/Title";
import GuestBookView from "@/components/main/view";
import Admin from "@/components/main/Admin";
import Icon from "@/components/Icons/Icon";
import { getPost } from "../../../api/server/main";
import { Metadata } from "next";
import { differenceInHours } from "date-fns";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Main",
    description: "여러분들의 소중한 방명록을 남겨주세요!",
  };
}

export default async function Main() {
  const data = await getPost();
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), 9, 31);
  const diffHours = differenceInHours(now, targetDate);

  const title = (
    <div className="flex items-center">
      {diffHours < 0
        ? `DaHye BirthDay 🍰 is Coming`
        : `Today 🚀 is  DaHye's BirthDay`}
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
