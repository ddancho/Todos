"use client";

import TodosList from "@/components/_todos/TodosList";
import TodoForm from "@/components/_todos/TodoForm";

function Todos() {
  return (
    <section
      className="bg-orange-50 w-full h-full rounded-md border border-black/10 
                grid grid-cols-[7fr_4fr] grid-rows-[1fr]"
    >
      <div className="p-2">
        <TodosList />
      </div>
      <div className="p-2 border-l border-black/10">
        <TodoForm />
      </div>
    </section>
  );
}

export default Todos;
