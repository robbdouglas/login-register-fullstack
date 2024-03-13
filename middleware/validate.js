import { validationResult } from "express-validator";
import createError from "http-errors";

export default function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map((err) => {
    return { [err.path]: err.msg };
  });
  return next(createError(422, "validation Error", { errors: errorMessages }));
}
