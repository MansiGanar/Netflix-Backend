import { body } from "express-validator";

export const mediaValidation = [
  body("Title").exists().withMessage("Title is a mandatory field"),
  body("Year").exists().withMessage("Year is a mandatory field!"),
];
