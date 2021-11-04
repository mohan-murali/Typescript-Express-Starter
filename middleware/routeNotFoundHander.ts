import { NextFunction, Request, Response } from "express";

export const routeNotFoundHander = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ success: false, message: "No route found" });
};
