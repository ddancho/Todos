"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateTodo, CreateTodoSchema } from "@/types/todoSchema";
import { useCreateTodo } from "@/services/todoMutations";
import toast from "react-hot-toast";

function TodoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTodo>({
    resolver: zodResolver(CreateTodoSchema),
  });

  const createTodo = useCreateTodo();

  const onSubmit = (data: CreateTodo) => {
    createTodo.mutate(data);

    if (createTodo.error) {
      toast.error(createTodo.error.message);
      return;
    }

    toast.success("Todo created successfully");

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between h-full"
    >
      <div className="flex flex-col space-y-6">
        <h2 className="text-center text-lg">Add a Todo</h2>
        <input
          {...register("title")}
          type="text"
          className="h-10 border border-black/30 rounded px-2 w-full"
          placeholder="Title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{`${errors.title.message}`}</p>
        )}
        <textarea
          {...register("content")}
          className="h-40 border border-black/30 rounded px-2 w-full resize-none"
          rows={5}
          placeholder="Content"
        ></textarea>
        {errors.content && (
          <p className="text-red-500 text-sm">{`${errors.content.message}`}</p>
        )}
      </div>

      <button
        type="submit"
        className="h-12 bg-gray-800 hover:bg-gray-600 hover:text-[1.05rem] text-white w-full rounded cursor-pointer"
        disabled={isSubmitting}
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
