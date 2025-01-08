"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const resData = await response.json();
        setError(resData.error || "Invalid login credentials.");
        return;
      }

      const resData = await response.json();
      alert("Login successful!");

      router.push("/");
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black flex justify-center items-center w-full h-screen">
      <form
        className="bg-white w-[30%] h-[70%] flex flex-col justify-center items-center gap-3 text-bold rounded-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="mt-4 font-extrabold">Login</h1>
        <div className="flex flex-col justify-center gap-2">
          <div className="flex flex-col gap-2 items-center">
            <label htmlFor="">Username</label>{" "}
            <input
              className="border-2 border-black rounded-xl text-center"
              type="text"
              name="username"
              id=""
              placeholder="username"
            />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <label htmlFor="">password</label>{" "}
            <input
              className="border-2 border-black rounded-xl text-center"
              type="password"
              name="password"
              id=""
              placeholder="password"
            />
          </div>
          <button type="submit" className="p-2 rounded-xl bg-blue-300 mb-4">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
