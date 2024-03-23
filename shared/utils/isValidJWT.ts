import * as jwt from "jsonwebtoken";

export default async function isValidJWT(
  token: string,
  type: "access" | "refresh"
) {
  const access_secret = process.env["ACCESS_TOKEN_SECRET"] ?? "";
  const refresh_secret = process.env["REFRESH_TOKEN_SECRET"] ?? "";
  const secret = type === "access" ? access_secret : refresh_secret;
  return new Promise((resolve) => {
    jwt.verify(token, secret, function (err, payload) {
      if (err) resolve(false);
      return resolve(true);
    });
  });
}
