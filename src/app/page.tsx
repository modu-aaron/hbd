import Cover from "@/components/shared/Cover";
import Title from "@/components/shared/Title";
import prisma from "../lib/prisma";
import GuestBookView from "@/components/main/view";

export default async function Home() {
  const getEntries = async () => {
    const data = await prisma.guestbook.findMany({
      take: 50,
      orderBy: {
        created_at: "desc",
      },
    });

    return data;
  };

  const revalide = 60;

  const data = await getEntries();
  return (
    <Cover>
      <Title title="Today`s Dahye BirthDay 🎉" />
      <div className="flex flex-1 max-[700px]:flex-col space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-8">
          <video
            className="rounded-full object-cover h-60 w-60"
            loop
            autoPlay
            playsInline
            muted
          >
            <source src="/intro.mp4" type="video/mp4" />
          </video>
          <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">
            황다롱
          </h3>
          <p className="text-gray-500 text-[18px] dark:text-gray-300 text-center">
            안녕 생일을 맞이한 다롱이야 올해도 잘부탁해❤️
          </p>

          <div className="flex space-x-5 pt-6 items-center">
            <a
              href="https://instagram.com/darong_hye?igshid=MzRlODBiNWFlZA=="
              target="_blank"
            >
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="w-8 h-8 text-gray-500 hover:text-gray-600"
              >
                <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 01-47.9 47.9z" />
              </svg>
            </a>
            <a href="https://m.blog.naver.com/ekgul1372" target="_blank">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-500 hover:text-gray-600"
              >
                <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
              </svg>
            </a>
          </div>
        </div>
        {data && <GuestBookView data={data} />}
      </div>
    </Cover>
  );
}
