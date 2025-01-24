"use client";
import CreatePost from "@/components/CreatePost";
import React from "react";
import Unauthorized from "@/components/unauthorized";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  if (session) {
    return <Unauthorized />;
  }

  return <CreatePost />;
};

export default page;
