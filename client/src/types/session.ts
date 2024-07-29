import { SessionOptions } from "iron-session";

// const expires = new Date(Date.now() + x * 60 * 1000);

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET_KEY!,
  cookieName: "todos-session",
  cookieOptions: {
    // expires,
    // maxAge: undefined,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export type SessionData = {
  name?: string;
  email?: string;
  apiKey?: string;
  isLoggedIn: boolean;
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export type SessionServiceResponse = {
  status: "success" | "error";
  sessionData?: SessionData;
};
