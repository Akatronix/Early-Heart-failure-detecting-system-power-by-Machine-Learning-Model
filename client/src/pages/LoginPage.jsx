"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Lock, Eye, EyeOff, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to login.");
        setIsLoading(false);
        throw new Error(errorData.message || "Failed to login.");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      setTimeout(() => {
        setIsLoading(false);
        toast.success("Login successfully!");
      }, 2000);
      setFormData({ email: "", password: "" });
      if (data.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (data.role === "user") {
        window.location.href = "/user/dashboard";
      } else if (data.role === "doctor") {
        window.location.href = "/doctor/dashboard";
      } else if (data.role === "nurse") {
        window.location.href = "/nurse/dashboard";
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while loggin-in, please try again."
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="rounded-2xl shadow-xl overflow-hidden">
          <div className="flex items-center justify-center bg-white">
            {/* Right Side - Login Form */}
            <div className="p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                    Sign in to your account
                  </h2>
                  <p className="text-sm text-gray-600 mb-5">
                    Welcome back! Please enter your details.
                  </p>
                </div>
                {/* Login Form */}
                <form className="space-y-6" onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="mb-2">
                        Email address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password" className="mb-2">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            });
                          }}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Loading...
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a
                      href="/auth/signup"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Sign up
                    </a>
                  </p>
                </div>

                {/* Help Section */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Need Help?</h4>
                      <p className="text-sm text-blue-700">
                        Contact our support team at support@cardiaccare.ai or
                        call (+234) 808-825-6605.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
