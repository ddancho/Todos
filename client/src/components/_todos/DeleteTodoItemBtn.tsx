"use client";

import { useDeleteTodo } from "@/services/todoMutations";
import toast from "react-hot-toast";

type DeleteTodoItemBtnProps = {
  id: string;
};

function DeleteTodoItemBtn({ id }: DeleteTodoItemBtnProps) {
  const deleteTodo = useDeleteTodo();

  const handleDeleteTodo = (id: string) => {
    deleteTodo.mutate(id);

    if (deleteTodo.error) {
      toast.error("Ups, something went wrong. Try again later");
      return;
    }

    toast.success("Todo deleted successfully");
  };

  return (
    <button
      className="text-red-600 font-bold px-1 hover:scale-125"
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        handleDeleteTodo(id);
      }}
    >
      X
    </button>
  );
}

export default DeleteTodoItemBtn;
