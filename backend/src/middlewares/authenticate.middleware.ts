import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies.jwttoken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ success: false, message: "Access Denied" });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid Token" });
    return;
  }
};
