"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import PostCard from "./PostCard";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePostClick = (id: number) => {
    router.push(`/post/${id}`);
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/post/posts`);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data.posts);
      console.log(posts);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      fetchPosts(); //
    }
  }, [session]);
  return (
    <div className="min-h-screen  bg-gray-100">
      <Navbar />
      <div className="">
        <div className="p-[100px]">
          <h1
            className="relative w-[max-content] font-mono
before:absolute before:inset-0 before:bg-gray-100 text-[70px] font-bold
before:animate-typewriter
"
          >
            Welcome back, {session?.user?.name}!
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold text-2xl text-gray-700 mb-6">See Posts</h2>
          <div className="flex flex-wrap gap-4">
            {posts?.map((post) => (
              <div
                className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden w-80 h-auto hover:shadow-lg transition duration-300"
                key={post.id}
                onClick={() => handlePostClick(post.id)}
              >
                <PostCard title={post.title} content={post.content} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
