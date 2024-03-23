import Cookie from "js-cookie";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "../types/login";

export default function saveUserTokens(
  access_token: string,
  refresh_token: string
) {
  Cookie.set("access_token", access_token, { expires: REFRESH_TOKEN_MAX_AGE });
  Cookie.set("refresh_token", refresh_token, { expires: ACCESS_TOKEN_MAX_AGE });
}
