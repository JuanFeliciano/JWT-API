import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayLoad = {
  id: string;
  iat: number;
  exp: number;
};

export async function AuthMiddlewares(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json("Token is not provided!");
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = verify(token, "SECRETKEY");
    const { id } = decoded as TokenPayLoad;

    req.userId;
    next();
  } catch (error) {
    return res.status(401).json("Token Invalid!");
  }
}
