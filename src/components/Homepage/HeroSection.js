"use client"
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function HeroSection() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/register");
  };
  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="pb-28 px-20 max-sm:px-4 flex flex-col lg:flex-row gap-10 mt-10">
      <div className="w-full lg:w-[30%] relative px-4">
        <div className="text-[40px] lg:text-[55px] text-center sm:text-left leading-none top-0 absolute max-sm:relative w-full lg:w-[600px] rounded-4xl z-20">
          ALL YOUR BUSINESS BANKING IN ONE PLATFORM
        </div>
        <div className="h-32 max-sm:h-0"></div>
        <div className="pt-20 max-sm:pt-10 max-sm:text-center pb-10 text-gray-400 text-sm lg:text-base">
          Take your business to new heights with faster cash flow and clear
          financial insights all with a free Novo account. Apply in 10 Minutes
        </div>
        <div>
          <button 
            className="flex gap-2 max-sm:m-auto border-[1px] border-gray-300 rounded-full px-4 py-2 items-center text-lg"
            onClick={handleGetStarted}
          >
            <img src="/Arrow.png" alt="Arrow" className="w-8" />
            <div>Get Started</div>
          </button>
        </div>
        <div className="py-8 max-sm:text-center">
          Already Started?{" "}
          <span className="text-orange-500 cursor-pointer">
            Finish Application
          </span>
        </div>
      </div>
      <div className="w-full lg:w-[60%] flex justify-end rounded-3xl relative h-[300px] lg:h-[500px]">
        <img
          src="/heroSection_Image1.png"
          alt="HeroImage"
          className="w-full h-full object-cover rounded-3xl"
        />
        <motion.div
          className="bg-gray-400/20 text-white backdrop-blur-sm border-2 border-gray-100 rounded-2xl px-4 py-1 absolute top-24 left-8 lg:top-52 lg:left-32 flex gap-2 items-center justify-center"
          variants={fadeInFromLeft}
          initial="hidden"
          animate="visible"
        >
          <img src="/dollar.png" alt="Dollar" className="h-8 lg:h-10" />
          <div>
            <div className="text-white">Nova Balance</div>
            <div className="text-xs">$17,500</div>
          </div>
        </motion.div>
        <motion.div
          className="bg-gray-400/20 text-white backdrop-blur-sm border-2 border-gray-100 rounded-2xl px-4 py-1 absolute top-40 right-5 lg:top-72 lg:right-10 flex gap-2 items-center justify-center"
          variants={fadeInFromRight}
          initial="hidden"
          animate="visible"
        >
          <img src="/tick.png" alt="Tick" className="h-8 lg:h-10" />
          <div>
            <div className="text-white">Invoice Paid</div>
            <div className="text-xs">$900</div>
          </div>
        </motion.div>
      </div>
      <div className="w-full lg:w-[30%] px-4">
        <img
          src="/heroSection_Image2.png"
          alt="HeroImage"
          className="rounded-2xl w-full h-auto"
        />
        <div className="mt-8 flex items-center gap-4">
          <img src="/Arrow.png" alt="HeroImage" className="h-16 lg:h-20" />
          <div>
            <div className="font-medium text-lg lg:text-xl">
              Instant card control
            </div>
            <div className="text-sm mt-1 text-gray-500">
              Monitor all your purchases in one place, and freeze or unfreeze
              your card in a few taps.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
