"use client";

import TodoItem from "@/components/_todos/TodoItem";
import { useGetTodosQuery } from "@/services/todoQueries";
import { Todo } from "@/types/todoSchema";

function TodosList() {
  let todos: Todo[] = [];
  const { error, isSuccess, data } = useGetTodosQuery();

  if (isSuccess && data) {
    todos = data;
  }

  return (
    <>
      {error && <h1 className="text-red-500 font-medium">{error.message}</h1>}
      {isSuccess && todos.length === 0 ? (
        <h1 className="font-medium">Add a Todo</h1>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <TodoItem todo={todo} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default TodosList;
