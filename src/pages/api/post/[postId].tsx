import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { postId } = req.query;

  if (!postId) {
    return res.status(400).json({ error: "Post ID is required" });
  }
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!post) {
      return res.status(404).json({
        posts: null,
        message: "no posts exists",
      });
    }

    return res.status(200).json({ post: post, message: "posts fethced" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
