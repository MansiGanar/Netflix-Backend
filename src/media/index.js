import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
import fs from "fs";

const mediaRouter = express.Router();

const currentDir = dirname(fileURLToPath(import.meta.url));
const mediaJSONPath = join(currentDir, "media.json");

mediaRouter.get("/", (req, res) => {
  const mediaContent = fs.readFileSync(mediaJSONPath);
  const mediaArray = JSON.parse(mediaContent);
  res.send(mediaArray);
});

mediaRouter.post("/", (req, res) => {
  const newMedia = {
    ...req.body,
    imbd: uniqid(),
    review: {},
  };

  const media = JSON.parse(fs.readFileSync(mediaJSONPath));
  media.push(newMedia);
  fs.writeFileSync(mediaJSONPath, JSON.stringify(media));
  res.status(201).send(media);

  //   let newMovie = req.body;
  //   newMovie.imbd = uniqid();

  //   console.log(newMovie);
  //   res.send(newMovie);
});

mediaRouter.put("/:mediaId", (req, res) => {
  console.log("PUT req");
});

mediaRouter.delete("/:mediaId", (req, res) => {
  const mediaContent = JSON.parse(fs.readFileSync(mediaJSONPath));

  const remainingMedia = mediaContent.filter(
    (m) => m.id !== req.params.mediaId
  );

  fs.writeFileSync(mediaJSONPath, JSON.stringify(remainingMedia));
  res.send("File Deleted");
});

export default mediaRouter;
