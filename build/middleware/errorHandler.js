"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHander = void 0;
const errorHander = (err, req, res, next) => {
    res.status(500).json({ success: false, message: err.message });
};
exports.errorHander = errorHander;
