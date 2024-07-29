import { axios, apiLogin } from "@/types/apiEndPoints";
import { UserLoginResponseSchema } from "@/types/userSchema";
import { ApiResponse } from "@/types/apiEndPoints";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const apiResponse: ApiResponse = { message: "", status: 200 };

  try {
    const res = await axios({
      method: "post",
      url: apiLogin,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = UserLoginResponseSchema.safeParse(res.data);
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
      data: result.data,
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
