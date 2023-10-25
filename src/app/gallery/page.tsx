"use client";

import { motion } from "framer-motion";
import React from "react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchMoreImages = (numImages = 35) => {
    const totalImages = 35;
    const startingIndex = (page - 1) * numImages;

    const newImages: { src: string; loaded: boolean }[] = Array.from(
      { length: 96 },
      (_, i) => ({
        src: `/img/${(startingIndex + i + 1) % totalImages || totalImages}.png`,
        loaded: true,
      })
    );
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
            whileHover={{ scale: 1 }}
            whileTap={{ rotate: 15 }}
            initial={{
              scale: 0.95,
            }}
          >
            {image.loaded && (
              <motion.img
                src={image.src}
                alt="이미지"
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
                onLoad={() => {
                  setIsLoaded(true);
                }}
                initial={{
                  scale: 0.95,
                  filter: "blur(5px)",
                }}
                animate={{
                  filter: isLoaded ? "blur(0px)" : "blur(5px)",
                  transition: { ease: "easeIn", duration: 2 },
                }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </InfiniteScroll>
  );
};

const Skeleton = React.memo(() => {
  return (
    <motion.div className="w-full h-full bg-gray-300 animate-pulse rounded-md"></motion.div>
  );
});
Skeleton.displayName = "Skeleton";

export default GalleryPage;
