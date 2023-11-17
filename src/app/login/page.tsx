"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";




const LoginPage = () => {
  const router = useRouter();
  const [formData,setFormData] = React.useState({
    email:"",
    password:""
  });
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const {name,value} = e.target;
    setFormData({...formData,[name]:value})
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData)
   try {
    const response = await axios.post("/api/users/login",formData)
    console.log(response);
    router.push("/profile")
    return response;
   } catch (error:any) {
     console.log(error.message)
   }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl flex justify-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign In
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-black bg-[#7896e2] hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Login
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account yet?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

  )
}

export default LoginPage;
