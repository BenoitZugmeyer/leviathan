import { requestWithToken } from "src/api/request"

export async function verifyCredentials(token) {
  const response = await requestWithToken(token, "accounts/verify_credentials")
  return await response.json()
}
