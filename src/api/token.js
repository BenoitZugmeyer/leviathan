import storage from "src/storage"
import { retrieveRegistration } from "src/api/registration"
import { requestWithDomain } from "src/api/request"

export async function createToken(domain, email, password) {
  const registration = await retrieveRegistration(domain)
  const body = new URLSearchParams()
  body.append("client_id", registration.client_id)
  body.append("client_secret", registration.client_secret)
  body.append("grant_type", "password")
  body.append("username", email)
  body.append("password", password)

  const response = await requestWithDomain(domain, "oauth/token", {
    method: "POST",
    redirect: "manual",
    body,
  })

  if (response.status !== 200) {
    return {
      success: false,
    }
  }

  const token = Object.assign(await response.json(), { domain })
  storage.set("token", token)

  return {
    success: true,
    token,
  }
}

export function retrieveToken() {
  return storage.get("token")
}

export function deleteToken() {
  storage.delete("token")
}
