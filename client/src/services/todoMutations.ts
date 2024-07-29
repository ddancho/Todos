import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTodoService,
  deleteTodoService,
  updateTodoService,
} from "@/services/todo";
import { CreateTodo, Todo } from "@/types/todoSchema";

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: Todo) =>
      updateTodoService(todo.id, todo.isDone).then((data) => {
        if (data.status === "error") throw new Error(data.apiResponse?.message);
      }),

    // data from mutationFn is variables
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log("settled error:", error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: CreateTodo) =>
      createTodoService(todo).then((data) => {
        if (data.status === "error") throw new Error(data.apiResponse?.message);
      }),

    // data from mutationFn is variables
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log("settled error:", error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteTodoService(id).then((data) => {
        if (data.status === "error") throw new Error(data.apiResponse?.message);
      }),

    // data from mutationFn is variables
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log("settled error:", error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}
