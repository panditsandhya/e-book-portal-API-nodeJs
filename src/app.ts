import express from "express";
import cors from "cors";
import createHttpError from "http-errors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
import { config } from "./config/config";

const app = express();

app.use(cors({
  origin: config.frontendDomain,
})
);

app.use(express.json());

//Routes
app.get("/", (req, res, next) => {
  const error = createHttpError(400, "something went wrong");
  throw error;

  res.json({ message: "Welcome to e-book apis" });
});

//user router
app.use("/api/users", userRouter);

//books router
app.use("/api/books", bookRouter);


//global error handler
app.use(globalErrorHandler);

export default app;
