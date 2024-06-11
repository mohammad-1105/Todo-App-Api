import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTodo,
  deleteTodo,
  getCompletedTodos,
  getInCompletedTodos,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller.js";

export const router = Router();

router.use(verifyJWT); // use jwt verification in all routes

router.route("/create").post(createTodo);
router.route("/update/:todoId").patch(updateTodo);
router.route("/get-todo/:todoId").get(getTodo);
router.route("/get-todos").get(getTodos);
router.route("/delete-todo/:todoId").delete(deleteTodo);
router.route("/completed").get(getCompletedTodos);
router.route("/incompleted").get(getInCompletedTodos);
