"use server";

import {
  createSessionAction,
  destroySessionAction,
  getSessionAction,
} from "@/app/actions/session";
import { SessionServiceResponse } from "@/types/session";
import { User } from "@/types/userSchema";

export async function getSessionService(): Promise<SessionServiceResponse> {
  const serviceResponse: SessionServiceResponse = {
    status: "error",
    sessionData: {
      name: undefined,
      email: undefined,
      apiKey: undefined,
      isLoggedIn: false,
    },
  };

  const session = await getSessionAction();
  if (!session.isLoggedIn) {
    return serviceResponse;
  }

  serviceResponse.status = "success";
  serviceResponse.sessionData = {
    name: session.name,
    email: session.email,
    apiKey: session.apiKey,
    isLoggedIn: session.isLoggedIn,
  };

  return serviceResponse;
}

export async function createSessionService(
  user: User
): Promise<SessionServiceResponse> {
  const serviceResponse: SessionServiceResponse = {
    status: "error",
    sessionData: {
      name: undefined,
      email: undefined,
      apiKey: undefined,
      isLoggedIn: false,
    },
  };

  const data = await createSessionAction(user);

  if (data === null || !data.isLoggedIn) {
    return serviceResponse;
  }

  serviceResponse.status = "success";
  serviceResponse.sessionData = data;

  return serviceResponse;
}

export async function destroySessionService() {
  await destroySessionAction();
}
