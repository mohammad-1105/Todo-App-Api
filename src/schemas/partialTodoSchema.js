import { todoSchema } from "./todoSchema.js";

// method to create a schema that allows partial updates
export const partialTodoSchema = todoSchema.partial(); 