import { NextRequest } from "next/server";

export function getUserCredentials(request: NextRequest) {
  let access_token = request.cookies.get("access_token")?.value;
  let refresh_token = request.cookies.get("refresh_token")?.value;
  if (!access_token || !refresh_token) return null;
  return { access_token, refresh_token };
}
