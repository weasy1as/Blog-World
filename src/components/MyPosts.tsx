"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type posts = {
  id: number;
  title: string;
  content: string;
};
const MyPosts = () => {
  const [posts, setPosts] = useState<posts[]>();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handlePostClick = (id: number) => {
    router.push(`/post/${id}`);
  };

  useEffect(() => {
    const fetchPosts = async (userId: number) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/post/userPost/${userId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    if (session && session.user) {
      fetchPosts(session.user.id); //
    }
  }, [session]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/post/deletePost/${id}`, {
        method: "DELETE",
      });

      if (response) {
        alert("Post deleted successfully!");
        setPosts(posts?.filter((post) => post.id !== id));
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="font-bold text-2xl mt-6">My posts</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {posts?.map((post) => (
              <div
                key={post.id}
                className=" bg-white shadow-md rounded-lg   w-80 max-h-[300px] flex flex-col items-center cursor-pointer hover:shadow-lg transition duration-300"
              >
                <div
                  className="overflow-y-auto flex flex-col items-center p-4"
                  onClick={() => handlePostClick(post.id)}
                >
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-700 text-sm text-center">
                    {post.content}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleDelete(post.id);
                  }}
                  className=" bg-red-500 text-white my-2 px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
