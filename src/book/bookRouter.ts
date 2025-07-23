import express from "express";
import { createBook } from "./bookController";
import multer from "multer";
import path from "node:path";
import authenticate from "../middlewares/authenticate";

const bookRouter = express.Router();

//file upload
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  //put limit 10mb max
  limits: { fileSize: 3e7 }, // 30mb
});

//routes
bookRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
