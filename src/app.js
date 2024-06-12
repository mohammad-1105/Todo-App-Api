import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.middleware.js"
import compression from "compression";

export const app = express();

// middlewares
app.use(express.static("./public"));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

function shouldCompress(req, res) {
  // Check for custom header to skip compression
  if (req.headers['x-no-compression']) {
    return false;
  }
  // Use default filter function for compression
  return compression.filter(req, res);
}

// Apply compression middleware with custom filter
app.use(compression({ filter: shouldCompress }));


// import routes 
import { router as userRouter } from "./routes/user.route.js";
import {router as todoRouter } from "./routes/todo.router.js"


// route declarations
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);




// Custom JSON error handler middleware (define it after all routes)
app.use(errorHandler);