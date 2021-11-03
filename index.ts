import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Dog");
});

app.listen(3000, () => {
  console.log("The application is listening on port 3000");
});
