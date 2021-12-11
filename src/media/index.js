import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
import fs from "fs-extra";
import { mediaValidation } from "./validation.js";
import { validationResult } from "express-validator";

const mediaRouter = express.Router();

const currentDir = dirname(fileURLToPath(import.meta.url));
const mediaJSONPath = join(currentDir, "media.json");

const anotherLoggerMiddleware = (req, res, next) => {
  console.log(`The GET method`);
  next();
};

mediaRouter.get("/", anotherLoggerMiddleware, (req, res, next) => {
  try {
    const mediaContent = fs.readFileSync(mediaJSONPath);
    const mediaArray = JSON.parse(mediaContent);
    // res.send(mediaArray);
    console.log("Query:", req.query);
    if (req.query && req.query.Title) {
      const filteredMedia = mediaArray.filter(
        (med) => med.Title === req.query.Title
      );
      res.send(filteredMedia);
    } else {
      res.send(mediaArray);
    }
  } catch (error) {
    next(error);
  }
});

mediaRouter.post("/", mediaValidation, (req, res, next) => {
  try {
    const errorList = validationResult(req);
    if (!errorList.isEmpty()) {
      next(
        createHttpError(400, "Some errors occured in the request body", {
          errorList,
        })
      );
    } else {
      const newMedia = {
        ...req.body,
        imdbId: uniqid(),
        review: {},
      };

      const media = JSON.parse(fs.readFileSync(mediaJSONPath));
      media.push(newMedia);
      fs.writeFileSync(mediaJSONPath, JSON.stringify(media));
      res.status(201).send(media);
    }
  } catch (error) {
    next(error);
  }

  //   let newMovie = req.body;
  //   newMovie.imbd = uniqid();

  //   console.log(newMovie);
  //   res.send(newMovie);
});

mediaRouter.put("/:mediaId", (req, res) => {
  console.log("PUT req");
});

mediaRouter.delete("/:mediaId", (req, res, next) => {
  try {
    const media = JSON.parse(fs.readFileSync(mediaJSONPath));

    const remainingMedia = media.filter((m) => m.id !== req.params.mediaId);

    fs.writeFileSync(mediaJSONPath, JSON.stringify(remainingMedia));
    res.status(204).send("File Deleted");
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
