"use client";

import { Todo } from "@/types/todoSchema";
import DeleteTodoItemBtn from "@/components/_todos/DeleteTodoItemBtn";
import TodoContent from "@/components/_todos/TodoContent";
import { useUpdateTodo } from "@/services/todoMutations";
import toast from "react-hot-toast";

type TodoItemProps = {
  todo: Todo;
};

function TodoItem({ todo }: TodoItemProps) {
  const updateTodo = useUpdateTodo();

  const handleUpdate = (todo: Todo) => {
    updateTodo.mutate({ ...todo, isDone: !todo.isDone });
  };

  if (updateTodo.error) {
    toast.error("Ups, something went wrong. Try again later");
    return;
  }

  return (
    <div
      className="flex justify-between items-center border-b border-black/15 cursor-pointer
                    px-4 h-10 hover:bg-white"
    >
      <span
        className={`${
          todo.isDone ? "line-through text-slate-400" : ""
        } hover:text-[1.05rem]`}
        onClick={() => handleUpdate(todo)}
      >
        {todo.title}
      </span>
      <div className="flex items-center">
        <TodoContent content={todo.content} />
        <DeleteTodoItemBtn id={todo.id} />
      </div>
    </div>
  );
}

export default TodoItem;
