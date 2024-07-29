import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/types/session";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  try {
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions
    );

    if (!session.isLoggedIn && !request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    if (session.isLoggedIn && request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: ["/auth"],
};
