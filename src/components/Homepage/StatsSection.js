"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function StatsSection() {
  return (
    <div className="flex flex-col lg:flex-row px-10 lg:px-20 justify-center items-center my-20 gap-10">
      <img
        src="/StatsSection_Image1.png"
        alt="Image"
        className="w-full lg:w-1/2 object-contain"
      />
      <div className="py-10 max-w-lg">
        <div className="bg-[#FD5339] px-5 text-white rounded-full max-sm:m-auto py-2 text-center w-52">
          OUR CUSTOMERS
        </div>

        <div className="text-3xl sm:text-4xl my-6 max-sm:text-center">
          FOR GROWING TEAMS AND THE SELF-EMPLOYED ALIKE
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center">
          <div className="text-gray-500 text-sm w-64">
            Whether you&apos;re just getting started or employ an established team,
            Novo can help you get your business&apos;s finances in order. Here&apos;s how
            small business customers have found success using Novo&apos;s powerful
            digital banking tools.
          </div>
          <button className="flex gap-2 border border-gray-300 rounded-full px-4 py-2 items-center text-lg">
            <img src="/Arrow.png" alt="Arrow" className="w-6" />
            <span>Learn More</span>
          </button>
        </div>
        <div className="mt-8">
          <img src="/StatsSection_Image2.png" alt="Image" className="w-full" />

          <div className="bg-[#e9e9e9] py-6 rounded-b-xl flex flex-wrap justify-around items-center gap-6">
            <StatItem value={200000} label="CUSTOMERS" post={"+"}/>
            <StatItem value={0} label="MONTHLY FEE" pre={"$"}/>
            <StatItem value={500000000} label="FASTER PAYMENTS" pre={"$"} post={"+"} />
            <StatItem value={4.9} label="APP RATING" />
          </div>
        </div>
      </div>
    </div>
  );
}

const StatItem = ({ value, label, pre, post }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <div className="text-center" ref={ref}>
      <div className="text-3xl font-semibold">
        {inView && (
          <div>
            {pre}
            <CountUp
              end={value}
              duration={2.5}
              formattingFn={(num) => formatNumber(num)}
              preserveValue={true}
            />
            {post}
          </div>
        )}
      </div>
      <div className="text-xs">{label}</div>
    </div>
  );
};

const formatNumber = (num) => {
  if (num >= 1_000_000) return Math.round(num / 1_000_000) + "M";
  if (num >= 1_000) return Math.round(num / 1_000) + "K";
  return num.toString();
};

export default StatsSection;
