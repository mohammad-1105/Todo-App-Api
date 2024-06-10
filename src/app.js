import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.middleware.js"

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

// import routes 
import { router as userRouter } from "./routes/user.route.js";



// route declarations
app.use("/api/v1/user", userRouter);





// Custom JSON error handler middleware (define it after all routes)
app.use(errorHandler);