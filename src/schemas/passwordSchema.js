import { z } from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z
    .string({ message: "Old password is required" })
    .min(6, { message: "Incorrect old password" })
    .max(16, {
      message: "Incorrect old password",
    }),

  newPassword: z
    .string({ message: "New password is required" })
    .min(6, { message: "Why new password is just less than 6 characters" })
    .max(16, {
      message: "Password max limit upto 16 characters",
    }),
});
