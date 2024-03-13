import { body } from "express-validator";
import validate from "./validate.js";

/**
 * Array of user validation rules.
 * @type {Array<Function>}
 */
const userValidationRules = [
  body("userName")
    .isString()
    .isLength({ min: 2, max: 15 })
    .withMessage(
      "The user name is requiered and must contain at least 2 and max. 15 characters."
    ),
  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!])[0-9a-zA-Z?!]{8,}$/)
    .withMessage(
      "The password must contain at least 1 number, 1 lowercase and uppercase character, one special character and be at least 8 characters long."
    ),
  validate,
];

export { userValidationRules };
