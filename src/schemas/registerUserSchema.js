import { z } from "zod";

export const registerUserSchema = z.object({
  fullName: z
    .string({ message: "Fullname is required !" })
    .min(3, { message: "Name must be more than 3 characters" })
    .max(20, { message: "Name limit upto 20 characters" }),

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
