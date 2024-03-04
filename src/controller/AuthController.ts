import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json("Email is not exists!");
    }

    const validPass = compare(password, user.password);

    if (!validPass) {
      return res.status(401).json("Password is not valid!");
    }

    const token = sign({ id: user.id }, "SECRETKEY", { expiresIn: "60m" });

    return res.status(200).json({ user, token });
  }
}
