"use client";
import { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../context/authContext";
function RegisterPage() {
  const { setIsLoggedIn } = useAuth() || {}; 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!setIsLoggedIn) {
      console.warn("Auth context is not available.");
    }
  }, [setIsLoggedIn]);
  const handleSignup = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast.success("Registration successful! Redirecting...");
        setIsLoggedIn(true);
        setTimeout(() => router.push("/"), 2000);
      } else {
        const errorData = await response.json();
        if (errorData.message === "User already exists") {
          toast.error("User already exists! Please log in.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <Toaster position="top-right" reverseOrder={false} />{" "}
      <div className="max-w-screen-xl m-0 sm:m-6 bg-white shadow sm:rounded-lg flex items-center justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-8">
          <div>
            <Link
              href="/"
              className="text-2xl font-extrabold text-[#FD5339] flex items-center"
            >
              <img src="./logo.png" alt="Logo" width={40} /> NOVA
            </Link>
          </div>

          <div className="flex flex-col items-center h-full">
            <div className="w-full flex-1 justify-center items-center mt-4">
              <div className="mx-auto mt-8">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  className="mt-5 tracking-wide font-semibold bg-[#FD5339] text-white w-full py-4 rounded-lg hover:bg-[#d1513d] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={handleSignup}
                >
                  <FontAwesomeIcon icon={faUsers} className="w-6 h-6 -ml-2" />
                  <span className="ml-2">Sign Up</span>
                </button>

                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Nova&lsquo;s{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

                <p className="mt-4 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#FD5339] hover:text-[#d15542] font-semibold"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 h-full bg-gray-200 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/Signup.png')" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;