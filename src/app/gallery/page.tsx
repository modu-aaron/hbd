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
  const [images, setImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMoreImages = (numImages = 35) => {
    setIsLoading(true);
    const totalImages = 35;
    const startingIndex = (page - 1) * numImages;

    const newImages = Array.from(
      { length: 96 },
      (_, i) =>
        `/img/${(startingIndex + i + 1) % totalImages || totalImages}.jpg`
    );
    setImages((prev) => [...prev, ...newImages]);
    setPage((prev) => prev + 1);
    setIsLoading(false);
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
        {images.map((src, i) =>
          isLoading ? (
            <Skeleton key={i} />
          ) : (
            <motion.div
              key={i}
              className="w-full h-[300px]"
              whileHover={{ scale: 1 }}
              whileTap={{ rotate: 15 }}
              initial={{ scale: 0.95 }}
            >
              <motion.img
                src={src}
                alt="이미지"
                loading="lazy"
                className="w-full h-full object-cover rounded-md"
                variants={itemVariants}
              />
            </motion.div>
          )
        )}
      </motion.div>
    </InfiniteScroll>
  );
};

const Skeleton = React.memo(() => {
  return <div className="w-full h-[300px] bg-gray-300 animate-pulse"></div>;
});
Skeleton.displayName = "Skeleton";

export default GalleryPage;
