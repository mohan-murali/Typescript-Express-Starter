"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
//Create the epress app
const app = (0, express_1.default)();
//Configure the dotenv package so that we can use env variables accross the app
dotenv.config();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(routes_1.router);
//register middlewares to handle server side errors.
app.use(middleware_1.errorHander);
//register middlewares to handle routes that are not present
app.use(middleware_1.routeNotFoundHander);
//Get the port number from env variable. If its not present use default port number (3001)
const port = process.env.PORT || 3001;
//Start the server
app.listen(port, () => {
    console.log(`The application is listening on port ${port}`);
});
