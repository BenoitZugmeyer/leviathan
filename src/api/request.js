export function requestWithDomain(domain, route, options) {
  if (!route.startsWith("oauth/")) route = `api/v1/${route}`
  return fetch(`https://${domain}/${route}`, options)
}

export function requestWithToken(token, route, options) {
  return requestWithDomain(token.domain, route, Object.assign({}, options, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }))
}
