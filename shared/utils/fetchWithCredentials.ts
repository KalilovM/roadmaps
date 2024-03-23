import { NextRequest } from "next/server";
import { ACCESS_TOKEN_MAX_AGE, RefreshTokenResponse } from "../types/login";
import { getUserCredentials } from "./getUserCredentials";
import { resolve } from "path";
import saveUserTokens from "./saveUserTokens";

const BACKEND_URL = process.env.BACKEND_URL;
const MAX_TIME_REFRESH = ACCESS_TOKEN_MAX_AGE;

export default async function fetchWithCredentials(
  path: string,
  init: RequestInit | undefined,
  request: NextRequest
) {
  const userCredentials = getUserCredentials(request);
  if (!userCredentials) {
    return new Response("Unauthorized", { status: 401 });
  }
  const requestToFetch = makeFetch(path, init, userCredentials.access_token);
  // TODO: think about the refresh and access token expiration check functionality
  const response = await requestToFetch();
  if (response.status === 401) {
    const newAccess = await refresh(userCredentials.refresh_token);
    if ("access_token" in newAccess) {
      saveUserTokens(newAccess.access_token, userCredentials.refresh_token);
      return await requestToFetch(newAccess.access_token);
    }
    return new Response("Unauthorized", { status: 401 });
  }
  return response;
}

function refresh(refresh_token: string) {
  return new Promise<RefreshTokenResponse>((resolve) => {
    fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      });
  });
}

function makeFetch(
  path: string,
  init: RequestInit | undefined,
  accessToken: string
): (newAccessToken?: string) => Promise<any> {
  return async function (newAccessToken?: string) {
    return fetch(`${BACKEND_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${newAccessToken ?? accessToken}`,
      },
      ...init,
    }).then((res) => res.json());
  };
}
