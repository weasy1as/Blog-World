"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (!data.name || !data.username || !data.email || !data.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/user/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const resData = await response.json();
        setError(resData.message || "Something went wrong.");
        return;
      }

      const resData = await response.json();
      alert("User registered successfully: " + resData.message);

      e.currentTarget?.reset();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An error occurred. Please try again.");
    } finally {
      router.push("/login");
      setLoading(false);
    }
  };

  return (
    <div className="bg-black flex justify-center items-center w-full h-screen">
      <form
        className="bg-white w-[30%] h-[70%] flex flex-col justify-between items-center gap-3 text-bold rounded-xl pb-4"
        onSubmit={handleSubmit}
      >
        <h1 className="mt-4 font-extrabold">Register</h1>
        <div className="flex flex-col justify-center">
          <div className="flex flex-col gap-2 items-center">
            <label htmlFor="">Name</label>{" "}
            <input
              className="border-2 border-black rounded-xl text-center"
              type="text"
              name="name"
              id=""
              placeholder="name"
            />
          </div>
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
            <label htmlFor="">Email</label>{" "}
            <input
              className="border-2 border-black rounded-xl text-center"
              type="email"
              name="email"
              id=""
              placeholder="email"
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
            className={`p-2 rounded-xl my-4 ${
              loading
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-300 hover:bg-blue-500"
            }`}
            disabled={loading}
          >
            {loading ? "Loading.." : "Register"}
          </button>
        </div>
        <span>
          Already have an account? Login {""}
          <a className="underline text-blue-500" href="/login">
            Here
          </a>
        </span>
        {error != null ? <p className="text-red-500 font-bold">{error}</p> : ""}
      </form>
    </div>
  );
};

export default Register;
