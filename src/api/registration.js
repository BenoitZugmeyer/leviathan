import storage from "src/storage"
import { requestWithDomain } from "src/api/request"

export function retrieveRegistration(domain) {
    return storage.entry(`registration-${domain}`).orInsertWith(() => fetchRegistration(domain))
}

async function fetchRegistration(domain) {
    const body = new URLSearchParams()
    body.append("response_type", "code")
    body.append("client_name", "Leviathan")
    body.append("redirect_uris", "urn:ietf:wg:oauth:2.0:oob")
    const response = await requestWithDomain(domain, "apps", {
        method: "POST",
        body,
    })
    return await response.json()
}
