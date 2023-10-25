"use client";

import { motion } from "framer-motion";
import React from "react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const GalleryPage = () => {
  const [images, setImages] = useState<{ src: string; loaded: boolean }[]>([]);
  const [page, setPage] = useState(0);

  const fetchMoreImages = (numImages = 35) => {
    const totalImages = 35;
    const startingIndex = (((page - 1) * numImages) % totalImages) + 1;

    let newImages: { src: string; loaded: boolean }[] = [];

    for (let i = 0; i < numImages; i++) {
      const imageIndex = ((startingIndex + i - 1) % totalImages) + 1;
      newImages.push({ src: `/img/${imageIndex}.png`, loaded: true });
    }

    setImages((prev) => [...prev, ...newImages]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchMoreImages(35);
  }, []);

  if (!images.length) {
    return <div>이미지를 불러오고 있어요!</div>;
  }

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={() => fetchMoreImages(35)}
      hasMore={false}
      loader={<h4>이미지를 불러오는 중입니다.</h4>}
    >
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {images.map((image, i) =>
          image.loaded ? (
            <motion.div
              key={i}
              className="w-full h-[250px] md:h-[275px] lg:h-[300px]"
              whileHover={{ scale: 1 }}
              whileTap={{ rotate: 15 }}
              initial={{ scale: 0.95 }}
            >
              <motion.img
                src={image.src}
                alt="이미지"
                className="w-full h-full object-cover rounded-md"
                variants={itemVariants}
                loading="lazy"
                onLoad={() => {
                  const newImages = [...images];
                  newImages[i].loaded = true;
                  setImages(newImages);
                  console.log(images);
                }}
              />
            </motion.div>
          ) : (
            <Skeleton key={i} />
          )
        )}
      </motion.div>
    </InfiniteScroll>
  );
};
const Skeleton = React.memo(() => {
  return (
    <motion.div
      initial={{ scale: 0.95 }}
      className="w-full h-[300px] bg-gray-300 animate-pulse rounded-md"
    ></motion.div>
  );
});
Skeleton.displayName = "Skeleton";
export default GalleryPage;
