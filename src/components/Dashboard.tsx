"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Navbar />
      <div className="p-[100px]">
        <h1 className="text-[60px] font-bold">
          Welcome back, {session?.user?.name}!
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1>see posts</h1>
        <div>posts</div>
      </div>
    </div>
  );
};

export default Dashboard;
