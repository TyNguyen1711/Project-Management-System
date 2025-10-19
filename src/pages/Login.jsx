import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, User } from "lucide-react";
import loginSuccess from "../assets/login-success.png";
export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data) => {
    console.log("Login attempted with:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Add your login logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google login attempted");
    // Add Google OAuth logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-8 py-4 md:py-6 z-10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-lg md:text-xl font-bold text-gray-800">
            AProjectO
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-xl md:text-2xl">✶</span>
          <span className="text-xs md:text-sm font-medium">
            Asite Product System
          </span>
        </div>
      </header>

      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 xl:p-12">
        <div className="relative w-full max-w-lg xl:max-w-lg">
          <img
            src={loginSuccess}
            alt="Login Illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
              Welcome back, Yash
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                onChange={(e) => {
                  register("email").onChange(e);
                  if (errors.email) {
                    clearErrors("email");
                  }
                }}
                className={`w-full px-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  onChange={(e) => {
                    register("password").onChange(e);
                    if (errors.password) {
                      clearErrors("password");
                    }
                  }}
                  className={`w-full px-4 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Terms and Forgot Password */}
            <div className="flex items-center justify-between text-sm flex-wrap gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("acceptTerms", {
                    required: "You must accept the terms and conditions",
                  })}
                  onChange={(e) => {
                    register("acceptTerms").onChange(e);
                    if (errors.acceptTerms) {
                      clearErrors("acceptTerms");
                    }
                  }}
                  className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">Terms & Conditions</span>
              </label>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Forgot Password
              </a>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-600 -mt-3">
                {errors.acceptTerms.message}
              </p>
            )}

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3.5 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 pt-2">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-gray-900 font-semibold hover:text-blue-600 transition underline"
              >
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
