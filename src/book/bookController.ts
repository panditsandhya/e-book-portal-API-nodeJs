import path from "node:path";
import fs from "node:fs";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";
import bookModel from "./bookModel";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;

  const files = req.files as { [filename: string]: Express.Multer.File[] };

  const coverImageMineType = files.coverImage[0].mimetype
    .split("/")
    .slice(-1)[0];
  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
  );

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMineType,
    });

    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      }
    );

    console.log("bookFileUploadResult", bookFileUploadResult);

    console.log("uploadResult", uploadResult);

    const newBook = await bookModel.create({
      title,
      genre,
      author: "687f498d29deb5e3050b4994",
      coverImage: uploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    try {
      //Delete temp files
      await fs.promises.unlink(filePath);
      await fs.promises.unlink(bookFilePath);

      res.status(201).json({ id: newBook._id });
    } catch (error) {
      console.log(error);
      return next(createHttpError(500, "Error while deleting temp  the files"));
    }
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while uploading the files"));
  }
};

export { createBook };
