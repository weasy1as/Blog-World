"use client";
import Dashboard from "@/components/Dashboard";
import { useSession } from "next-auth/react";
import Unauthorized from "@/components/unauthorized";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return <Dashboard />;
  }

  return <Unauthorized />;
}
