"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import { toast, Toaster } from "react-hot-toast"; // Add this import

function LoginPage() {
  const { setIsLoggedIn } = useAuth() || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!setIsLoggedIn) {
      console.warn("Auth context is not available.");
    }
  }, [setIsLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast.success("Login successful!");
        setIsLoggedIn(true);
        router.push("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Invalid credentials");
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      setError("An unexpected error occurred.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setIsForgotLoading(true);
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setShowConfirmModal(true);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send reset link");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <Link
              href="/"
              className="text-2xl font-extrabold text-[#FD5339] flex items-center"
            >
              <img src="./logo.png" alt="Logo" width={40} /> NOVA
            </Link>
          </div>
          <div className="mt-0 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Sign In with Nova E-mail
                </div>
              </div>

              <div className="mx-auto">
                <form onSubmit={handleLogin}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <div className="relative mt-5">
                    <input
                      className="w-full px-8 py-4 pr-12 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.66a10.78 10.78 0 0116.04 0M10 14a4 4 0 118 0M21 21l-4-4"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.66a10.78 10.78 0 0116.04 0M10 14a4 4 0 118 0M4 4l16 16"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={isForgotLoading}
                      className="text-sm text-[#FD5339] hover:text-[#d15542] flex items-center"
                    >
                      {isForgotLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#FD5339] border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        "Forgot Password?"
                      )}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-[#FD5339] text-white-500 w-full py-4 rounded-lg hover:bg-[#be4937] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-2 text-white">Sign In</span>
                  </button>
                </form>

                {error && (
                  <p className="mt-6 text-xs text-red-600 text-center">
                    {error}
                  </p>
                )}

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
                  Don&lsquo;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-[#FD5339] hover:text-[#d15542] font-semibold"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-200 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/Login.png')",
            }}
          ></div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Reset Link Sent!
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Please check your email ({email}) for instructions to reset your
                password. The link will expire in 1 hour.
              </p>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="mt-6 w-full bg-[#FD5339] text-white py-2 px-4 rounded hover:bg-[#d15542]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
