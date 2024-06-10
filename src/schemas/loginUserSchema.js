import { z } from "zod";

export const loginUserSchema = z.object({
  email: z
    .string({ message: "Email is required !" })
    .email()
    .trim()
    .toLowerCase(),

  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Why password is just less than 6 characters" })
    .max(16, {
      message: "Password max limit upto 16 characters",
    }),
});
