import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const posts = await prisma.post.findMany();

    if (!posts) {
      return res.status(404).json({
        posts: null,
        message: "no posts exists",
      });
    }

    return res.status(200).json({ posts: posts, message: "posts fethced" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
