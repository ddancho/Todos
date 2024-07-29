import {
  ApiResponse,
  createTodoRoute,
  deleteTodoRoute,
  getTodoRoute,
  getTodosRoute,
  updateTodoRoute,
} from "@/types/apiEndPoints";
import { CreateTodo, Todo } from "@/types/todoSchema";
import { getSessionService } from "@/services/session";

type TodosServiceResponse = {
  status: "success" | "error";
  apiResponse?: ApiResponse;
  todos?: Todo[];
};

// getall
export async function getTodosService() {
  const serviceResponse: TodosServiceResponse = { status: "error" };

  const session = await getSessionService();
  const apiKey = session.sessionData?.apiKey ?? "";

  const response = await fetch(getTodosRoute, {
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    return serviceResponse;
  }

  if (response.status >= 400) {
    return serviceResponse;
  }

  const { data, apiResponse } = await response.json();
  if ((apiResponse as ApiResponse).status >= 400) {
    serviceResponse.apiResponse = apiResponse as ApiResponse;
    return serviceResponse;
  }

  serviceResponse.status = "success";
  serviceResponse.apiResponse = apiResponse as ApiResponse;
  serviceResponse.todos = data as Todo[];

  return serviceResponse;
}

type TodoServiceResponse = {
  status: "success" | "error";
  apiResponse?: ApiResponse;
  todo?: Todo;
};

// getone
export async function getTodoService(id: string) {
  const serviceResponse: TodoServiceResponse = { status: "error" };

  const session = await getSessionService();
  const apiKey = session.sessionData?.apiKey ?? "";

  const response = await fetch(getTodoRoute(id), {
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    return serviceResponse;
  }

  if (response.status >= 400) {
    return serviceResponse;
  }

  const { data, apiResponse } = await response.json();
  if ((apiResponse as ApiResponse).status >= 400) {
    serviceResponse.apiResponse = apiResponse as ApiResponse;
    return serviceResponse;
  }

  serviceResponse.status = "success";
  serviceResponse.apiResponse = apiResponse as ApiResponse;
  serviceResponse.todo = data as Todo;

  return serviceResponse;
}

export async function updateTodoService(id: string, isDone: boolean) {
  const serviceResponse: TodoServiceResponse = { status: "error" };

  const session = await getSessionService();
  const apiKey = session.sessionData?.apiKey ?? "";

  const response = await fetch(updateTodoRoute(id), {
    method: "put",
    body: JSON.stringify({ isDone }),
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    return serviceResponse;
  }

  if (response.status >= 400) {
    return serviceResponse;
  }

  const { data, apiResponse } = await response.json();
  if ((apiResponse as ApiResponse).status >= 400) {
    serviceResponse.apiResponse = apiResponse as ApiResponse;
    return serviceResponse;
  }

  serviceResponse.status = "success";
  serviceResponse.apiResponse = apiResponse as ApiResponse;

  return serviceResponse;
}

export async function createTodoService(todo: CreateTodo) {
  const serviceResponse: TodoServiceResponse = { status: "error" };

  const session = await getSessionService();
  const apiKey = session.sessionData?.apiKey ?? "";

  const response = await fetch(createTodoRoute, {
    method: "post",
    body: JSON.stringify(todo),
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    return serviceResponse;
  }

  if (response.status >= 400) {
    return serviceResponse;
  }

  const { data, apiResponse } = await response.json();
  if ((apiResponse as ApiResponse).status >= 400) {
    serviceResponse.apiResponse = apiResponse as ApiResponse;
    return serviceResponse;
  }

  serviceResponse.status = "success";
  serviceResponse.apiResponse = apiResponse as ApiResponse;

  return serviceResponse;
}

export async function deleteTodoService(id: string) {
  const serviceResponse: TodoServiceResponse = { status: "error" };

  const session = await getSessionService();
  const apiKey = session.sessionData?.apiKey ?? "";

  const response = await fetch(deleteTodoRoute(id), {
    method: "post",
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    return serviceResponse;
  }

  if (response.status >= 400) {
    return serviceResponse;
  }

  const { data, apiResponse } = await response.json();
  if ((apiResponse as ApiResponse).status >= 400) {
    serviceResponse.apiResponse = apiResponse as ApiResponse;
    return serviceResponse;
  }

  serviceResponse.status = "success";
  serviceResponse.apiResponse = apiResponse as ApiResponse;

  return serviceResponse;
}
