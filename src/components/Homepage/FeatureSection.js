"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    title: "Access Your Card at any time",
    description:
      "Every Nova checking account comes with a free physical debit card and virtual debit, so you always have access at your fingertips.",
  },
  {
    title: "Make Your Money Work for You",
    description:
      "Invest your money efficiently with Nova's automated savings features.",
  },
  {
    title: "Pay and get paid your way",
    description: "Send and receive payments seamlessly with no hidden fees.",
  },
  {
    title: "Free from hidden fees",
    description:
      "With Nova, enjoy transparent banking without worrying about hidden charges.",
  },
];

function FeatureSection() {
  const [expanded, setExpanded] = useState(0);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.5 });
  const isLeftInView = useInView(leftRef, { once: true, threshold: 0.5 });
  const isRightInView = useInView(rightRef, { once: true, threshold: 0.5 });
  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div>
      <motion.div
        className="pb-20 overflow-hidden px-20 max-sm:px-4 flex flex-col lg:flex-row gap-10 max-sm:mt-20 lg:px-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isLeftInView ? 1 : 0, x: isLeftInView ? 0 : -50 }}
          transition={{ duration: 0.5 }}
          className="h-[450px] relative w-[40%] max-sm:w-full flex gap-2 bg-white rounded-xl p-10"
        >
          <div className="w-64 relative ">
            <div className="h-40"></div>
            <div className="text-4xl absolute top-0 w-80 max-sm:">
              ONLINE BANKING THAT TAKES YOUR BUSINESS TO THE{" "}
              <span className="text-[#FD5339]">NEXT LEVEL</span>
            </div>
            <div className="text-sm text-gray-400 mt-6">
              Monitor all your purchases in one place, and freeze or unfreeze
              your cards in a few taps
            </div>
          </div>
          <div className="flex items-end">
            <img
              src="/FeatureSection_Image1.png"
              alt="Feature showcasing online banking"
              className="rounded-xl w-52 max-sm:hidden"
            />
          </div>
        </motion.div>

        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 50 }}
          animate={{
            opacity: isRightInView ? 1 : 0,
            x: isRightInView ? 0 : 50,
          }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-[55%] bg-[#F6F6F6] rounded-xl"
        >
          <div className="flex text-lg">
            <div className="bg-white py-4 px-8 rounded-tl-xl flex justify-center">
              <div className="bg-[#FD5339] px-4 h-8 flex items-center rounded-full text-white">
                BENEFITS
              </div>
            </div>
            <div className="bg-[#F6F6F6] flex flex-wrap max-sm:gap-1 gap-4 w-full px-4 rounded-tr-xl">
              {["Invoice", "Integration", "Partner Perks", "Nova Boost"].map(
                (item) => (
                  <div key={item} className="py-2">
                    <div className="bg-[#E5E4E4] px-4 py-1 rounded-full text-sm">
                      {item}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-white w-full p-8 rounded-b-xl space-y-6">
            {features.map((feature, index) => (
              <div key={index}>
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <motion.h3
                    className={`text-xl ${
                      expanded === index ? "text-[#FD5339]" : "text-black"
                    }`}
                  >
                    {feature.title}
                  </motion.h3>
                  <FontAwesomeIcon
                    icon={expanded === index ? faChevronUp : faChevronDown}
                    className="text-gray-500 w-4"
                  />
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expanded === index ? "auto" : 0,
                    opacity: expanded === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-500 mt-2 w-96">
                    {feature.description}
                  </p>
                </motion.div>
                <hr className="border-2 border-gray-300 mt-4" />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-xl p-8 md:p-14 w-full"
      >
        <div className="flex flex-col md:flex-row md:justify-around gap-8">
          <div className="text-center md:text-left">
            <div className="text-2xl">FDIC insured</div>
            <div className="text-sm text-gray-500 mt-2 max-w-xs mx-auto md:mx-0">
              Your deposits are insured for up to $250,000 through our partner
              bank, Middlesex Federal Savings.
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="text-2xl">Powerful security</div>
            <div className="text-sm text-gray-500 mt-2 max-w-xs mx-auto md:mx-0">
              Our bank-grade encryption ensures that your information remains
              safe and secure at all times.
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="text-2xl">Instant card controls</div>
            <div className="text-sm text-gray-500 mt-2 max-w-xs mx-auto md:mx-0">
              Freeze or unfreeze your cards anytime with just a few taps through
              our mobile app.
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center mt-10">
          <img
            src="/FeatureSection_Image2.png"
            alt="Feature Image 2"
            className="h-48 sm:h-64 object-contain"
          />
          <img
            src="/FeatureSection_Image3.png"
            alt="Feature Image 3"
            className="h-48 sm:h-64 object-contain max-sm:hidden"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default FeatureSection;
