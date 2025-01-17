"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
function SolutionSection() {
  const router = useRouter();
  const handleGetStarted = () => {
    console.log("Get Started");
    router.push("/register");
  };
  const cards = [
    {
      title: "INVOICE",
      description:
        "Create and send an unlimited number of fully customizable invoices directly from your account.",
      image: "/SolutionSection_Image1.png",
    },
    {
      title: "INTEGRATIONS",
      description:
        "From Stripe to Shopify, integrate with multiple apps to manage everything from one place.",
      image: "/SolutionSection_Image2.png",
    },
    {
      title: "PARTNER PERKS",
      description:
        "Save thousands on tools like Gusto and Hubspot with exclusive perks.",
      image: "/SolutionSection_Image1.png",
    },
    {
      title: "SUPPORT",
      description:
        "Our support team is available 24/7 to assist with any inquiries.",
      image: "/SolutionSection_Image2.png",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="my-8 px-4 sm:px-8 py-16 bg-white">
      <div className="mb-8 flex flex-col sm:flex-row max-w-screen justify-between items-center">
        <div className="text-2xl sm:text-3xl text-center sm:text-left">
          <div>OUR SOLUTION MAKES IT EASIER</div>
          <div>FOR YOU IN ALL TRANSACTIONS</div>
        </div>
        <div className="flex gap-4 items-center mt-4 sm:mt-0">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="swiper-button-prev-custom text-black bg-gray-200 rounded-full px-4 py-1 cursor-pointer text-2xl"
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            className="swiper-button-next-custom bg-[#FD5339] text-white rounded-full px-4 py-1 cursor-pointer text-2xl"
          />
        </div>
      </div>

      <Swiper
        slidesPerView={1} 
        spaceBetween={20}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        modules={[Navigation, Pagination]}
        className="w-full sm:slidesPerView-3"
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div
              className={`p-8 h-80 rounded-xl transition-all duration-300 ${
                index === activeIndex
                  ? "bg-[#FD5339] text-white"
                  : "bg-gray-200"
              }`}
            >
              <div
                className={`border rounded-full text-center px-3 py-2 w-40 ${
                  index === activeIndex
                    ? "border-white text-white"
                    : "border-gray-500 text-gray-700"
                }`}
              >
                {card.title}
              </div>
              <div className="text-2xl my-4">{card.title}</div>
              <div
                className={`text-xs ${
                  index === activeIndex ? "text-gray-200" : "text-gray-500"
                }`}
              >
                {card.description}
              </div>
              <img
                src={card.image}
                alt={card.title}
                className="mt-8 rounded-xl mx-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col sm:flex-row justify-around my-20 gap-8 items-center">
        <div className="text-2xl sm:text-3xl text-center sm:text-left w-full sm:w-96">
          ALL IN ONE MONEY MANAGEMENT
        </div>
        <div className="max-w-xl text-gray-400 text-center sm:text-left">
          Running a business is complicated enough. Your banking solution should
          be simple—and help simplify. Spend less time managing your finances
          and more time running your business with Novo.
        </div>
        <button className="flex gap-2 max-sm:m-auto border-[1px] border-gray-300 rounded-full px-4 py-1 items-center text-lg" onClick={handleGetStarted}>
          <img src="/Arrow.png" alt="Arrow" className="w-8" />
          <div>Get Started</div>
        </button>
      </div>
    </div>
  );
}

export default SolutionSection;
