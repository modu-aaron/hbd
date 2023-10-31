"use client";

import { motion } from "framer-motion";
import React from "react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.5 },
  },
};

const GalleryPage = () => {
  const [images, setImages] = useState<{ src: string; loaded: boolean }[]>([]);
  const [page, setPage] = useState(1);

  const fetchMoreImages = (numImages = 35) => {
    const totalImages = 35;
    const startingIndex = (page - 1) * numImages;

    const newImages: { src: string; loaded: boolean }[] = Array.from(
      { length: numImages },
      (_, i) => ({
        src: `/img/${(startingIndex + i + 1) % totalImages || totalImages}.png`,
        loaded: true,
      })
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  useEffect(() => {
    fetchMoreImages(35);
  }, [page]);

  if (!images.length) {
    return <div>이미지를 불러오고 있어요!</div>;
  }

  return (
    <>
      <head>
        <title>Gallery</title>
        <meta name="title" content="Gallery" />
        <meta name="description" content="다혜 갤러리에 오신걸 환영합니다!" />
      </head>
      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {images.map((image, i) => (
            <motion.div
              key={i}
              className={`w-full h-[250px] md:h-[275px] lg:h-[300px]`}
              whileTap={{ rotate: 15 }}
              initial={{
                scale: 0.95,
              }}
            >
              <Image
                src={image.src}
                alt="이미지"
                layout="fill"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                placeholder="blur"
                loading="lazy"
                className="w-full h-full object-cover rounded-md"
              />
            </motion.div>
          ))}
        </motion.div>
      </InfiniteScroll>
    </>
  );
};

const Skeleton = React.memo(() => {
  return (
    <motion.div className="w-full h-full bg-gray-300 animate-pulse rounded-md"></motion.div>
  );
});
Skeleton.displayName = "Skeleton";

export default GalleryPage;
