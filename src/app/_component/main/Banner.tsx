"use client";

import React from "react";
import Slider from "react-slick";
import { Article } from "@/api/types";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@radix-ui/themes";
import Image from "next/image";

interface BannerProps {
  topArticles: Article[];
}

const Banner = ({ topArticles }: BannerProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    nextArrow: <Image src="/next_button.svg" alt="search" width={32} height={32}></Image>,
    prevArrow: <Image src="/back_button.svg" alt="search" width={32} height={32}></Image>
  };

  return (
    <Box pb={"50px"} width={"80%"} style={{ margin: "0 auto" }}>
      <h2>인기 아티클</h2>
      <Box
        className="popular"
        style={{
          borderRadius: "20px",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Slider {...settings}>
          {topArticles.map(item => (
            <ArticleCard
              key={item.pageId}
              pageId={item.pageId}
              createdAt={item.createdAt}
              title={item.title}
              thumbnailUrl={item.thumbnailUrl}
              properties={item.properties}
              showCreatedAt={false}
              showRole={false}
            />
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Banner;
