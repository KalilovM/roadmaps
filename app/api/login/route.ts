import {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  SingInResponse,
} from "@/shared/types/login";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const tokenResponse: SingInResponse = await fetch(
    "http://localhost:8000/api/v1/auth/login",
    options
  ).then((res) => res.json());
  if ("detail" in tokenResponse) {
    return new Response(JSON.stringify(tokenResponse), { status: 401 });
  }
  const response = NextResponse.json(tokenResponse, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
  response.cookies.set({
    name: "refresh_token",
    path: "/",
    value: tokenResponse.refresh_token,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
  response.cookies.set({
    name: "access_token",
    path: "/",
    value: tokenResponse.access_token,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  return response;
}
