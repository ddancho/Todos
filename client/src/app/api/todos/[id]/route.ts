import { axios, apiGetTodo, apiUpdateTodo } from "@/types/apiEndPoints";
import { TodoSchema } from "@/types/todoSchema";
import { ApiResponse } from "@/types/apiEndPoints";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const apiResponse: ApiResponse = { message: "", status: 200 };
  const id = params.id;
  const apiKey = request.headers.get("x-api-key") ?? null;
  const data = await request.json();

  try {
    const res = await axios({
      method: "put",
      url: apiUpdateTodo(id),
      data,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });

    apiResponse.message = res.statusText;
    apiResponse.status = res.status;

    return NextResponse.json({
      apiResponse,
      data: res.data,
    });
  } catch (error: any) {
    let status = 400;

    if (error.response) {
      // Error from response
      status = 400;
    } else if (error.request) {
      // The request was made but no response was received
      // Server is down
      status = 500;
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log(error.message);
      status = 400;
    }

    apiResponse.message = "Ups, something went wrong, try again later";
    apiResponse.status = status;

    return NextResponse.json({
      apiResponse,
      data: undefined,
    });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const apiResponse: ApiResponse = { message: "", status: 200 };
  const id = params.id;
  const apiKey = request.headers.get("x-api-key") ?? null;

  try {
    const res = await axios({
      method: "get",
      url: apiGetTodo(id),
      headers: {
        "x-api-key": apiKey,
      },
    });

    const result = TodoSchema.safeParse(res.data);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      apiResponse.message = errorMessage;
      apiResponse.status = 400;

      return NextResponse.json({
        apiResponse,
        data: undefined,
      });
    }

    apiResponse.message = res.statusText;
    apiResponse.status = res.status;

    return NextResponse.json({
      apiResponse,
      data: res.data,
    });
  } catch (error: any) {
    let status = 400;

    if (error.response) {
      // Error from response
      // console.log(error.response.data);
      status = 400;
    } else if (error.request) {
      // The request was made but no response was received
      // Server is down
      status = 500;
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log(error.message);
      status = 400;
    }

    apiResponse.message = "Ups, something went wrong, try again later";
    apiResponse.status = status;

    return NextResponse.json({
      apiResponse,
      data: undefined,
    });
  }
}
