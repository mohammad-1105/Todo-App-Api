import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string({ message: "Todo Title is required !" })
    .min(4, { message: "Title must be more 3 characters" })
    .max(30, { message: "Title max limit is 30 characters" }),

  content: z
    .string({ message: "Todo content is required !" })
    .min(10, { message: "why content is just less than 10 characters ? " })
    .max(300, { message: "content limit upto 300 characters" }),
});
