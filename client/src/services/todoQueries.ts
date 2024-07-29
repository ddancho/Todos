import { useQuery } from "@tanstack/react-query";
import { getTodosService } from "@/services/todo";
import { Todo } from "@/types/todoSchema";

export function useGetTodosQuery() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      getTodosService().then((data) => {
        if (data.status === "error") {
          throw new Error(data.apiResponse?.message);
        } else {
          return data.todos as Todo[];
        }
      }),
  });
}
