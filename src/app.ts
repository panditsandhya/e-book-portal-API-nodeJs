import express from "express";
import createHttpError from "http-errors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();

app.use(express.json());

//Routes
app.get("/", (req, res, next) => {
  const error = createHttpError(400, "something went wrong");
  throw error;

  res.json({ message: "Welcome to e-book apis" });
});

//user router
app.use("/api/users", userRouter);

//global error handler
app.use(globalErrorHandler);

export default app;
