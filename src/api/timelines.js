import { requestWithToken } from "src/api/request"

export async function getTimeline(token, type) {
    const response = await requestWithToken(token, `timelines/${type}`)
    return await response.json()
}
