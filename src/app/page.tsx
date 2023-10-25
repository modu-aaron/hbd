"use client";
import Icon from "@/components/Icons/Icon";
import Lenis from "@studio-freight/lenis";
import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
  useMotionValue,
  animate,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

const Column = ({ images, y }: { images: string[]; y?: MotionValue }) => {
  return (
    <motion.div
      style={{ y }}
      className="column relative h-full w-[25%] min-w-[80px] sm:min-w-fit flex flex-col gap-[2vw]"
    >
      {images.map((src, index) => {
        return (
          <div
            key={index}
            className="imageContainer relative h-full w-full rounded-[1vw] overflow-hidden"
          >
            <Image
              src={`/images/${src}`}
              fill
              priority
              alt="image"
              className="object-cover"
            />
          </div>
        );
      })}
    </motion.div>
  );
};

const HomePage = () => {
  const container = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [showDiv, setShowDiv] = useState(false);
  const [textColor, setTextColor] = useState("hsl(180, 90%, 70%)");

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const animation = animate(count, 25, { duration: 3 });

    const unsubscribe = count.onChange((currentCount) => {
      const baseHue = 180;
      const range = 90;
      const progress = baseHue - range / 2 + (currentCount / 25) * range;
      const newColor = `hsl(${progress}, 90%, 70%)`;
      setTextColor(newColor);
    });
    return () => {
      unsubscribe();
      animation.stop();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = rounded.onChange((value) => {
      if (value === 25) {
        setShowDiv(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [rounded]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  //----------card
  return (
    <div style={{ height: "100dvh" }}>
      <div
        style={{ height: "100dvh" }}
        className="flex justify-center items-center bg-white dark:bg-[#090908]"
      >
        <motion.div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#090908]">
          <motion.p
            style={{ color: textColor }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="font-bold relative text-[130px]"
          >
            {rounded}
          </motion.p>
          {showDiv && (
            <motion.div
              className="absolute bottom-12 flex flex-col items-center"
              style={{ stroke: textColor }}
              initial={{ y: 0 }}
              animate={{ y: 20 }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <p style={{ color: textColor }}>Scroll Down</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </div>
      <div>
        <div className="spacer"></div>
        <div
          style={{ willChange: "transform" }}
          ref={container}
          className="h-[175vh] bg-white dark:bg-black relative flex gap-[2vw] p-[2vw] box-border overflow-hidden"
        >
          <Column images={[images[0], images[1], images[2]]} y={y} />
          <Column images={[images[3], images[4], images[5]]} y={y2} />
          <Column images={[images[6], images[7], images[8]]} y={y3} />
          <Column images={[images[9], images[10], images[11]]} y={y4} />
        </div>
        <div className="spacer"></div>
      </div>
      <div
        style={{ height: "100dvh" }}
        className="bg-white dark:bg-[#090908] w-full flex items-center justify-center"
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="group h-80 w-80 [perspective:1000px]">
            <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0">
                <Image
                  className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
                  src={`/img/introCard.png`}
                  alt="인트로"
                  loading="eager"
                  width={400}
                  height={400}
                />
              </div>
              <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-4 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="flex relative min-h-full w-full flex-col items-center justify-center">
                  <h1 className="text-3xl font-bold">{Icon.DaramiIcon}</h1>
                  <p className="text-base pt-4 whitespace-pre-wrap">
                    초대에 응해주신 여러분, 환영합니다! 이 사이트가 여러분에게도
                    특별한 경험이 되길 바랍니다.
                  </p>
                  <Link
                    href={"/main"}
                    className="absolute bottom-6 rounded-md bg-neutral-800 py-4 px-8 text-lg hover:bg-neutral-900"
                  >
                    홈으로
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
