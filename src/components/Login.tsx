"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    console.log(data);
    try {
      setLoading(true);
      setError(null);

      const signinData = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      console.log(signinData);
      if (signinData?.error) {
        setError("Wrong credentials");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  return (
    <div className="bg-black flex justify-center items-center w-full h-screen">
      <form
        className="bg-white w-[30%] h-[70%] flex flex-col justify-center items-center gap-3 text-bold rounded-xl"
        onSubmit={handleSubmit}
        method="POST"
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
          <button
            type="submit"
            className={`p-2 rounded-xl mb-4 ${
              loading
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-300 hover:bg-blue-500"
            }`}
            disabled={loading}
          >
            {loading ? "Loggin in.." : "Login"}
          </button>
        </div>
        <span>
          Not registered yet? Register {""}
          <a className="underline text-blue-500" href="/register">
            Here
          </a>
        </span>
        {error != null ? <p className="text-red-500 font-bold">{error}</p> : ""}
      </form>
    </div>
  );
};

export default Login;
