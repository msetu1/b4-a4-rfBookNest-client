import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, TUser } from "../../redux/feature/auth/authSlice";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import GradientBackground from "../../UI/GradientBackground";

const Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = await login(data).unwrap();

      const user = verifyToken(result.data.accessToken) as TUser;
      if (result?.success) {
        toast.success("Login Successfully..", {
          duration: 2000,
        });
      }
      dispatch(setUser({ user: user, token: result.data.accessToken }));
      navigate("/");

    } catch (error: any) {
      toast.error(error.data.message, { duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white text-center px-4 bg-black">
      {/* gradient  */}
      <GradientBackground />

      {/* login body content  */}
      <div className="max-w-md w-full text-white rounded-lg shadow-lg p-8 md:p-12 border border-gray-700 z-10">
        <h1 className="text-3xl font-bold text-center mb-3">Welcome Back</h1>
        <p className="text-center text-gray-400 mb-8">
          Sign in to access your account!
        </p>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-left text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter your email..."
                className={`w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 ${
                  errors.email} focus:outline-none focus:ring-2`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>
            <div>
              <label className="block text-left text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  className={`w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700 ${
                    errors.password} focus:outline-none focus:ring-2`}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white font-medium border border-[#C16EFD] rounded-lg bg-[linear-gradient(105deg,_#6384FC_4.1%,_#C16EFD_54.8%,_#6384FC_92.38%)] flex items-center justify-center"
          >
            <p>Login</p>
          </button>
        </form>
        <p className="text-left text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
