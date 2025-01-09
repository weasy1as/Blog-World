import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { email, password, username, name } = req.body;

    const checkEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (checkEmail) {
      return res.status(409).json({
        user: null,
        message: "user with email:" + email + "already exists",
      });
    }

    const checkUsername = await prisma.user.findUnique({
      where: { username: username },
    });

    if (checkUsername) {
      return res.status(409).json({
        user: null,
        message: "user with email:" + username + "already exists",
      });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        name,
        password: hashedPassword,
      },
    });
    return res.status(201).json({ user: newUser, message: "user created" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
