import { TodoModel } from "../models/todo.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { todoSchema } from "../schemas/todoSchema.js";
import { partialTodoSchema } from "../schemas/partialTodoSchema.js";

// controllers

const createTodo = asyncHandler(async (req, res) => {
  // get data from body
  const { title, content } = req.body;

  // validation with zod
  const { error } = todoSchema.safeParse({ title, content });
  if (error) {
    throw new ApiError(400, error.issues[0].message);
  }

  // create todo and save
  const newTodo = new TodoModel({
    title,
    content,
    createdBy: req.user._id,
  });

  await newTodo.save();

  if (!newTodo) {
    throw new ApiError(500, "Failed to create todo.");
  }

  return res.status(201).json(
    new ApiResponse(201, "Todo created successfully", {
      todo: newTodo,
    })
  );
});

const updateTodo = asyncHandler(async (req, res) => {
  // get todo id
  const { todoId } = req.params;

  // get data from body
  const updateData = req.body;

  // validation with zod
  const { success, error } = partialTodoSchema.safeParse(updateData);
  if (!success) {
    throw new ApiError(400, error.issues[0].message);
  }

  // Check if there is at least one field to update
  if (!Object.keys(updateData).length) {
    throw new ApiError(400, "No fields provided for update.");
  }

  // find todo and update
  const updatedTodo = await TodoModel.findByIdAndUpdate(
    todoId,
    {
      $set: updateData,
    },
    {
      new: true,
    }
  );

  if (!updatedTodo) {
    throw new ApiError(500, "Failed to update todo");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Todo updated successfully", updatedTodo));
});

const getTodo = asyncHandler(async (req, res) => {
  // get todo id
  const { todoId } = req.params;

  const todo = await TodoModel.findById(todoId);
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Todo Found successfully", todo));
});

const getTodos = asyncHandler(async (req, res) => {
  // get all todos
  const todos = await TodoModel.find({
    createdBy: req.user._id,
  });

  if (!todos) {
    throw new ApiError(500, "Failed to fetch todos");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Todos fetched successfully.", todos));
});

const deleteTodo = asyncHandler(async (req, res) => {
  // get todo Id
  const { todoId } = req.params;

  const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

  if (!deletedTodo) {
    throw new ApiError(500, "Failed to delete todo please try again.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Todo deleted successfully"));
});

const getCompletedTodos = asyncHandler(async (req, res) => {
  const completedTodos = await TodoModel.find({
    createdBy: req.user._id,
    complete: true,
  });
  if (!completedTodos) {
    throw new ApiError(500, "Failed to fetch completed todos");
  }

  if (completedTodos.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, "No completed todos available"));
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Completed todos fetched successfully",
          completedTodos
        )
      );
  }
});

const getInCompletedTodos = asyncHandler(async (req, res) => {
  const inCompletedTodos = await TodoModel.find({
    createdBy: req.user._id,
    complete: false,
  });
  if (!inCompletedTodos) {
    throw new ApiError(500, "Failed to fetch incompleted todos");
  }

  if (inCompletedTodos.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, "No incompleted todos available"));
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Incompleted todos fetched successfully",
          inCompletedTodos
        )
      );
  }
});

const toggleCompleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  const todo = await TodoModel.findById(todoId);
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }
  todo.complete = !todo.complete;
  await todo.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Todo updated successfully", todo));
});

// export controllers
export {
  createTodo,
  updateTodo,
  getTodo,
  getTodos,
  deleteTodo,
  getCompletedTodos,
  getInCompletedTodos,
  toggleCompleteTodo
};
