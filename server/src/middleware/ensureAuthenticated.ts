import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT token is missing.");
  }

  const [, token] = authHeader.split(" ");
  try {
    const decoded = verify(token, process.env.SECRET as string);
    return next();
  } catch {
    throw new Error("Invalid JWT token");
  }
}
