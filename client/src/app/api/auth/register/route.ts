import { axios, apiRegister, ApiResponse } from "@/types/apiEndPoints";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const apiResponse: ApiResponse = { message: "", status: 201 };

  try {
    const res = await axios({
      method: "post",
      url: apiRegister,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    apiResponse.message = res.statusText;
    apiResponse.status = res.status;

    // res.data is name propertiy
    return NextResponse.json({ apiResponse, data: res.data });
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
