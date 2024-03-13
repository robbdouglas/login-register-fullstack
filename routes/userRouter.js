import express from "express";
import {
  getAllUsers,
  register,
  login,
  getOneUser,
  deleteUser,
  // updateUser,
  // updatePartialUser,
  getAllPostsOfOneUser,
} from "../controllers/usersControllers.js";

import { userValidationRules } from "../middleware/userValidator.js";

const usersRouter = express.Router();

const usersMainPath = "/users";

usersRouter.route("/").get(getAllUsers);

usersRouter.route("/register").post(userValidationRules, register);
usersRouter.route("/login").post(userValidationRules, login);

usersRouter.get("/posts/:id", getAllPostsOfOneUser);

usersRouter
  .route("/:id")
  .get(getOneUser)
  // .put(updateUser)
  // .patch(updatePartialUser)
  .delete(deleteUser);

export { usersRouter, usersMainPath };
