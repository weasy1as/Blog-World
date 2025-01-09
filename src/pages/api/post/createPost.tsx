import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const checkUser = await prisma.user.findUnique({
      where: { id: authorId },
      select: {
        id: true,
      },
    });

    if (!checkUser) {
      return res.status(404).json({
        user: null,
        message: "user does not exists",
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        authorId,
        content,
      },
    });
    return res.status(201).json({ post: newPost, message: "post created" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
