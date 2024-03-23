export interface SingInResponse {
  refresh_token: string;
  access_token: string;
  token_type: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
}
// TODO: create UnauthrizedResponse type

export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60;
export const ACCESS_TOKEN_MAX_AGE = 60 * 60;
