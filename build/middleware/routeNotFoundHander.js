"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFoundHander = void 0;
const routeNotFoundHander = (req, res, next) => {
    res.status(404).json({ success: false, message: "No route found" });
};
exports.routeNotFoundHander = routeNotFoundHander;
