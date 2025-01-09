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
    <div>
      <Navbar />
      <div className="pb-[80px]">
        <div className="p-[100px]">
          <h1 className="text-[60px] font-bold">
            Welcome back, {session?.user?.name}!
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl mb-6">see posts</h1>
          <div className="flex flex-wrap gap-2">
            {posts?.map((post) => (
              <div
                className=" cursor-pointer"
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
