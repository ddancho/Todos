import _ from "axios";

const serverUrl = process.env.SERVER;

export const axios = _.create({
  baseURL: serverUrl,
});

// api auth
export const registerRoute = "/api/auth/register"; // POST
export const loginRoute = "/api/auth/login"; // POST
export const logoutRoute = "/api/auth/logout"; // POST

// api auth endpoint
export const apiRegister = `${serverUrl}${registerRoute}`; // POST
export const apiLogin = `${serverUrl}${loginRoute}`; // POST
export const apiLogout = `${serverUrl}${logoutRoute}`; // POST

// api todos
export const getTodosRoute = "/api/todos"; // GET
export const getTodoRoute = (id: string) => `/api/todos/${id}`; // GET
export const updateTodoRoute = (id: string) => `/api/todos/${id}`; // PUT
export const createTodoRoute = "/api/todos/create"; // POST
export const deleteTodoRoute = (id: string) => `/api/todos/delete/${id}`; // POST

// api todos endpoint
export const apiGetTodos = `${serverUrl}${getTodosRoute}`; // GET
export const apiGetTodo = (id: string) => `${serverUrl}/api/todos/${id}`; // GET
export const apiUpdateTodo = (id: string) =>
  `${serverUrl}/api/todos/update/${id}`; // PUT
export const apiCreateTodo = `${serverUrl}${createTodoRoute}`; // POST
export const apiDeleteTodo = (id: string) =>
  `${serverUrl}/api/todos/delete/${id}`; // POST

export type ApiResponse = {
  message: string;
  status: number;
};
