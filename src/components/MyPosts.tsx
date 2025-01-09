"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import PostCard from "./PostCard";
import { useSession } from "next-auth/react";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const fetchPosts = async (userId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/post/userPost/${userId}`);

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
      fetchPosts(session.user.id); //
    }
  }, [session]);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="font-bold text-2xl mt-6">My posts</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
