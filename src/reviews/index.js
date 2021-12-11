import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
import fs from "fs-extra";

const reviewsRouter = express.Router();

const currentDir = dirname(fileURLToPath(import.meta.url));

const reviewsJSONPath = join(currentDir, "reviews.json");

reviewsRouter.get("/", (req, res, next) => {
  try {
    const reviewsContent = fs.readFileSync(reviewsJSONPath);
    const reviewsArray = JSON.parse(reviewsContent);
    if (req.query && req.query.Title) {
      const filteredMedia = reviewsArray.filter(
        (med) => med.Title === req.query.Title
      );
      res.send(filteredMedia);
    } else {
      res.send(reviewsArray);
    }
  } catch (error) {
    next(error);
  }
});

reviewsRouter.post("/:reviewsId", (req, res) => {
  try {
    const newReview = {
      ...req.body,
      _id: uniqid(),
      createdAt: new Date(),
    };

    const reviews = JSON.parse(fs.readFileSync(reviewsJSONPath));
    reviews.push(newReview);
    fs.writeFileSync(reviewsJSONPath, JSON.stringify(reviews));
    res.status(201).send(reviews);
  } catch (error) {
    console.log(error.message);
  }
});

reviewsRouter.put("/:reviewsId", (req, res) => {
  console.log("PUT req");
});

reviewsRouter.delete("/:reviewsId", (req, res, next) => {
  try {
    const reviews = JSON.parse(fs.readFileSync(reviewsJSONPath));

    const remainingReviews = reviews.filter(
      (m) => m.id !== req.params.reviewsId
    );

    fs.writeFileSync(reviewsJSONPath, JSON.stringify(remainingReviews));
    res.status(204).send("Review Deleted");
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
