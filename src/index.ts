import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import swaggerJSDoc, { Options, SwaggerDefinition } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { errorHander, routeNotFoundHander } from "./middleware";
import { router } from "./routes";
import { connectDB } from "./config";

//Create the epress app
const app = express();

//Configure the dotenv package so that we can use env variables accross the app
dotenv.config();

//connect mongo DB
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["laskdjf"] }));
app.use(router);

//configure swagger
const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API with Typescript",
    version: "1.0.0",
  },
};

const options: Options = {
  definition: swaggerDefinition,
  apis: [__dirname + "/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
