"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";

const Post = ({ postId }) => {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const fetchPosts = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/post/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPost(data.post);
      console.log(post);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session && postId) {
      fetchPosts(postId); //
    }
  }, [postId]);
  return (
    <div>
      <Navbar />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex justify-center items-center mt-[100px]">
          <PostCard title={post?.title} content={post?.content} />
        </div>
      )}
    </div>
  );
};

export default Post;
