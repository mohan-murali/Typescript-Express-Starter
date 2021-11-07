import { NextFunction, Request, Response } from "express";

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not Permitted");
};
