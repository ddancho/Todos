import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string().trim().min(1, "Id is required"),
  title: z.string().trim().min(4, "Title is required"),
  content: z.string().trim().min(4, "Content is required"),
  isDone: z.boolean(),
  createdAt: z.string().trim().min(1, "CreatedAt is required"),
  updatedAt: z.string().trim().min(1, "UpdatedAt is required"),
});

export const TodosSchema = z.array(TodoSchema);

export type Todo = z.infer<typeof TodoSchema>;

export const UpdateTodoSchema = z.object({
  id: z.string().trim().min(1, "Id is required"),
});

export const CreateTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, "Title is required")
    .max(30, "Title is too long"),
  content: z
    .string()
    .trim()
    .min(4, "Content is required")
    .max(255, "Content is too long"),
});

export type CreateTodo = z.infer<typeof CreateTodoSchema>;
