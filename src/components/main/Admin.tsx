import Icon from "@/components/Icons/Icon";

const Admin = () => {
  return (
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
        안녕 생일을 맞이한 다롱이야 올해도 잘부탁해 ❤️
      </p>

      <div className="flex space-x-5 pt-6 items-center">
        <a
          href="https://instagram.com/darong_hye?igshid=MzRlODBiNWFlZA=="
          target="_blank"
        >
          {Icon.InstaIcon}
        </a>
        <a href="https://m.blog.naver.com/ekgul1372" target="_blank">
          {Icon.NaverIcon}
        </a>
      </div>
    </div>
  );
};

export default Admin;
