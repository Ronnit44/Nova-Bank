"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        toast.success("Password reset successful!");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Password reset failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-md w-full mx-4 bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <Link href="/" className="text-2xl font-extrabold text-[#FD5339] flex items-center">
            <img src="/logo.png" alt="Logo" width={40} /> NOVA
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            className="w-full px-4 py-2 rounded border mb-4"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 rounded border mb-6"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#FD5339] text-white py-2 rounded hover:bg-[#d15542]"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
