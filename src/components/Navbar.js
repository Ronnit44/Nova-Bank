"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';
import { useAuth } from "../../context/authContext";
import Link from "next/link";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const session = Cookies.get('session');
    if (session) setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoutClick = async () => {
    await fetch('/api/logout');
    Cookies.remove('session');
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleGetStartedClick = () => {
    router.push("/register");
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isRegister = pathname && pathname.startsWith("/register");
  const isLogin = pathname && pathname.startsWith("/login");

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <div className={`fixed top-0 left-0 w-full bg-white z-50 py-6 px-4 lg:px-16 ${isLogin || isRegister ? "hidden" : "block"}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
          <img src="/logo.png" alt="logo" className="w-8" />
          <img src="/logo_heading.png" alt="logo_heading" className="w-16" />
        </div>
        <div className="hidden lg:flex gap-12 text-lg font-medium text-gray-500">
          {isLoggedIn && (
            <>
              <Link href="/dashboard" className="hover:text-gray-400 cursor-pointer">Dashboard</Link>
              
            </>
          )}
          <div className="hover:text-gray-400 cursor-pointer" onClick={() => handleScrollToSection("solution-section")}>Solution</div>
          <div className="hover:text-gray-400 cursor-pointer" onClick={() => handleScrollToSection("resources-section")}>Resources</div>
          <div className="hover:text-gray-400 cursor-pointer" onClick={() => handleScrollToSection("result-section")}>Results</div>
          <div className="hover:text-gray-400 cursor-pointer" onClick={() => router.push("/contact")}>Contact</div>
        </div>
        <div className="hidden lg:flex gap-8 items-center">
          {!isLoggedIn ? (
            <>
              <div className="text-lg font-medium cursor-pointer" onClick={handleLoginClick}>
                Log in
              </div>
              <button
                className="flex gap-2 border-[1px] border-gray-300 rounded-full px-4 py-2 items-center text-lg hover:bg-gray-100"
                onClick={handleGetStartedClick}
              >
                <img src="/Arrow.png" alt="Arrow" className="w-6" />
                <div>Get Started</div>
              </button>
            </>
          ) : (
            <button
              className="flex gap-2 border-[1px] border-gray-300 rounded-full px-4 py-2 items-center text-lg hover:bg-gray-100"
              onClick={handleLogoutClick}
            >
              <img src="/Arrow.png" alt="Arrow" className="w-6" />
              <div>Logout</div>
            </button>
          )}
        </div>
        <div className="lg:hidden">
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            onClick={toggleMenu}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>
      <motion.div
        className="lg:hidden fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 p-8"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-8 text-lg font-medium text-gray-700">
          {isLoggedIn && (
            <>
              <Link href="/dashboard" className="text-lg font-medium cursor-pointer">Dashboard</Link>
            </>
          )}
          <div className="hover:text-gray-400 cursor-pointer" onClick={() => handleScrollToSection("solution-section")}>Solution</div>
          <div className="hover:text-gray-400 cursor-pointer" onClick={() => handleScrollToSection("resources-section")}>Resources</div>
          <div className="hover:text-gray-400 cursor-pointer" onClick={() => handleScrollToSection("result-section")}>Results</div>
          <div className="hover:text-gray-400 cursor-pointer" onClick={() => router.push("/contact")}>Contact</div>
          <hr className="border-gray-300 my-4" />
          <div className="flex flex-col gap-4">
            {!isLoggedIn ? (
              <>
                <div className="text-lg font-medium cursor-pointer" onClick={handleLoginClick}>
                  Log in
                </div>
                <button
                  className="flex gap-2 border-[1px] border-gray-300 rounded-full px-4 py-2 items-center text-lg hover:bg-gray-100"
                  onClick={handleGetStartedClick}
                >
                  <img src="/Arrow.png" alt="Arrow" className="w-6" />
                  <div>Get Started</div>
                </button>
              </>
            ) : (
              <button
                className="flex gap-2 border-[1px] border-gray-300 rounded-full px-4 py-2 items-center text-lg hover:bg-gray-100"
                onClick={handleLogoutClick}
              >
                <img src="/Arrow.png" alt="Arrow" className="w-6" />
                <div>Logout</div>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Navbar;
