"use server";

import { SessionData, sessionOptions, defaultSession } from "@/types/session";
import { User } from "@/types/userSchema";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getSessionAction() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export async function createSessionAction(user: User): Promise<SessionData> {
  const session = await getSessionAction();

  session.name = user.name;
  session.email = user.email;
  session.apiKey = user.apiKey;
  session.isLoggedIn = true;

  await session.save();

  return {
    name: session.name,
    email: session.email,
    apiKey: session.apiKey,
    isLoggedIn: session.isLoggedIn,
  };
}

export async function destroySessionAction() {
  const session = await getSessionAction();

  session.destroy();
}
