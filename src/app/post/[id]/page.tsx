"use client";
import Post from "@/components/post";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const page = () => {
  const { id } = useParams();
  return (
    <div>
      <Post postId={id} />
    </div>
  );
};

export default page;
