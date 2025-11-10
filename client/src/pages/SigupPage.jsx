"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Lock, Eye, EyeOff, Mail, AlertCircle, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SigupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createNewUser = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to create user");
        throw new Error(errorData.message || "Failed to create user");
      }
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Account created successfully!");
      }, 2000);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/auth/login");
    } catch (error) {
      toast.error(
        error.message || "An error occurred while creating the user."
      );
      console.error("Error creating user:", error);
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
                    Create your account
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    Please fill in those fields.
                  </p>
                </div>
                {/* Login Form */}
                <form className="space-y-6" onSubmit={createNewUser}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username" className="mb-2">
                        Username
                      </Label>
                      <div className="relative">
                        <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />

                        <Input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="Emmanuel"
                          className="pl-10"
                          value={formData.username}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            });
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2">
                        Email
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

                    <div>
                      <Label htmlFor="password" className="mb-2">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="confirm_password"
                          name="confirm_password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="confirm password"
                          className="pl-10 pr-10"
                          value={formData.confirmPassword}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              confirmPassword: e.target.value,
                            });
                          }}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
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
                      "Create Account"
                    )}
                  </Button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/auth/login"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Login
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

export default SigupPage;
