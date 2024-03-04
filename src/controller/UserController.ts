import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { hash } from "bcryptjs";

export class UserController {
  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  }
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const UserExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (UserExists) {
      return res.status(401).json("User already exists!");
    }

    const hash_pass = await hash(password, 4);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash_pass,
      },
    });

    return res.status(201).json(user);
  }
}
