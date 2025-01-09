"use client";
import Post from "@/components/post";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  return (
    <div>
      <Post postId={id} />
    </div>
  );
};

export default Page;
