import express, { Request, Response } from "express";
import { errorHander, routeNotFoundHander } from "./middleware";
import * as dotenv from "dotenv";

//Create the epress app
const app = express();

//Configure the dotenv package so that we can use env variables accross the app
dotenv.config();

//Sample request
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Dog");
});

//register middlewares to handle server side errors.
app.use(errorHander);

//register middlewares to handle routes that are not present
app.use(routeNotFoundHander);

//Get the port number from env variable. If its not present use default port number (3001)
const port = process.env.PORT || 3001;

//Start the server
app.listen(port, () => {
  console.log(`The application is listening on port ${port}`);
});
