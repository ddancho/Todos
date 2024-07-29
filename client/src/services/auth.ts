import { loginRoute, registerRoute } from "@/types/apiEndPoints";
import { UserSignIn, UserSignUp } from "@/types/userSchema";
import { ApiResponse } from "@/types/apiEndPoints";
import { User } from "@/types/userSchema";
import { destroySessionService } from "@/services/session";

type AuthServiceResponse = {
  status: "success" | "error";
  apiResponse?: ApiResponse;
  user?: User;
};

export async function authRegisterService(
  signUpData: UserSignUp
): Promise<AuthServiceResponse> {
  const serviceResponse: AuthServiceResponse = { status: "error" };

  const response = await fetch(registerRoute, {
    method: "post",
    body: JSON.stringify(signUpData),
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

export async function authLoginService(
  signInData: UserSignIn
): Promise<AuthServiceResponse> {
  const serviceResponse: AuthServiceResponse = { status: "error" };

  const response = await fetch(loginRoute, {
    method: "post",
    body: JSON.stringify(signInData),
  });

  if (!response.ok) {
    return serviceResponse;
  }

  if (response.status >= 400) {
    return serviceResponse;
  }

  const { data, apiResponse } = await response.json();
  if (data === null || data === undefined) {
    serviceResponse.apiResponse = apiResponse as ApiResponse;
    return serviceResponse;
  }

  serviceResponse.status = "success";
  serviceResponse.user = data as User;
  serviceResponse.apiResponse = apiResponse as ApiResponse;

  return serviceResponse;
}

export async function authLogoutService() {
  await destroySessionService();
}
