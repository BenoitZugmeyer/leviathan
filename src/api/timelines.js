import { requestWithToken } from "src/api/request"

export async function getTimelinesHome(token) {
    const response = await requestWithToken(token, "timelines/home")
    return await response.json()
}
