import { axios, apiCreateTodo } from "@/types/apiEndPoints";
import { ApiResponse } from "@/types/apiEndPoints";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiResponse: ApiResponse = { message: "", status: 200 };
  const data = await request.json();
  const apiKey = request.headers.get("x-api-key") ?? null;

  try {
    const res = await axios({
      method: "post",
      url: apiCreateTodo,
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
      console.log("ERROR-RESPONSE:", error.response);
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
