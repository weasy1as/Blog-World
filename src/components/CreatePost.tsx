"use client";
import React, { FormEvent, useState } from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import Unauthorized from "@/components/unauthorized";

const CreatePost = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authorId = session?.user?.id;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      authorId,
    };

    if (!data.title || !data.content || !data.authorId) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (!authorId) {
      setError("You must be logged in to create a post.");
      setLoading(false);
      return;
    }

    console.log(data);
    try {
      const response = await fetch("/api/post/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response) {
        alert("Post created successfully!");
        form.reset();
      }
      setError(null);
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-5 flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">Create Post </h1>
        <div className="shadow-xl w-[400px] p-4 rounded-xl h-auto ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            action=""
          >
            <div className="flex flex-col">
              <label htmlFor="">Titel</label>
              <input
                className="border-2 p-2 border-black rounded-xl"
                type="text"
                name="title"
                id=""
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Content</label>
              <textarea
                className="border-2 border-black rounded-xl w-full h-[200px] p-2"
                name="content"
                id=""
              ></textarea>
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
              {loading ? "Loading.." : "Create Post"}
            </button>
            {error != null ? (
              <p className="text-red-500 font-bold">{error}</p>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
