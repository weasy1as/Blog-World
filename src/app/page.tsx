"use client";
import Dashboard from "@/components/Dashboard";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Unauthorized from "@/components/unauthorized";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return <Dashboard />;
  }

  return <Unauthorized />;
}
