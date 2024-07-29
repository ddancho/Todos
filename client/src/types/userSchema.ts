import { z } from "zod";

export const UserSignUpSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Email is required")
      .email({ message: "Email is not valid" }),
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(255, "Name is too long"),
    password: z
      .string()
      .trim()
      .min(6, "Password is too short")
      .max(255, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type UserSignUp = z.infer<typeof UserSignUpSchema>;

export const UserSignInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email({ message: "Email is not valid" }),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .max(255, "Password is too long"),
});

export type UserSignIn = z.infer<typeof UserSignInSchema>;

export const UserLoginResponseSchema = z.object({
  email: z
    .string()
    .email({ message: "Email is not valid" })
    .min(1, "Email is required"),
  name: z.string().trim().min(1, "Name is required"),
  apiKey: z.string().trim().min(1, "ApiKey is required"),
});

export type User = z.infer<typeof UserLoginResponseSchema>;

export const UserSessionSchema = UserLoginResponseSchema;
