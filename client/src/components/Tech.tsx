"use client";

import Link from "next/link";

function Tech() {
  return (
    <div className="bg-orange-50 w-full p-2 rounded-md border border-black/10">
      <h1 className="py-4 text-center text-7xl font-bold text-slate-600">
        Todos
      </h1>
      <h2 className="py-4 text-center text-2xl font-medium text-slate-500">
        NextJS - AspNet Core App
      </h2>
      <div className="flex flex-col justify-center items-center bg-white rounded border">
        <span className="text-center text-sm text-slate-400 pt-2">
          List of frameworks and/or libraries used
        </span>
        <div className="px-2 py-2 text-xl">
          <Link href="https://nextjs.org/" target="_blank">
            NextJS - Client Components, Route Handlers
          </Link>
        </div>
        <div className="px-2 py-2 text-slate-700">
          <Link href="https://ui.shadcn.com/" target="_blank">
            --- Shadcn/ui ---
          </Link>
        </div>
        <div className="px-2 py-2 text-slate-700">
          <Link
            href="https://www.npmjs.com/package/iron-session"
            target="_blank"
          >
            --- Iron Session ---
          </Link>
        </div>
        <div className="px-2 py-2 text-slate-700">
          <Link href="https://zod.dev/" target="_blank">
            --- Zod ---
          </Link>
        </div>
        <div className="px-2 py-2 text-slate-700">
          <Link
            href="https://www.npmjs.com/package/@tanstack/react-query"
            target="_blank"
          >
            --- Tanstack React Query ---
          </Link>
        </div>
        <div className="px-2 py-2 text-slate-700">
          <Link
            href="https://www.npmjs.com/package/react-hook-form"
            target="_blank"
          >
            --- React Hook Form ---
          </Link>
        </div>
        <div className="px-2 py-2 text-xl">
          <Link
            href="https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-6.0"
            target="_blank"
          >
            AspNet Core
          </Link>
        </div>
        <div className="px-2 py-2 text-slate-700">
          <Link href="https://learn.microsoft.com/en-us/ef/" target="_blank">
            --- Entity Framework Core ---
          </Link>
        </div>
        <div className="px-2 py-2 text-slate-700">
          <Link
            href="https://docs.fluentvalidation.net/en/latest/"
            target="_blank"
          >
            --- Fluent Validation ---
          </Link>
        </div>
        <div className="px-2 py-2 text-slate-700">
          <Link href="https://docs.docker.com/" target="_blank">
            --- Docker with PostgreSQL image ---
          </Link>
        </div>
        <div className="px-2 py-2 text-slate-700">
          <Link href="#" target="_blank">
            --- ApiKey Auth ---
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Tech;
