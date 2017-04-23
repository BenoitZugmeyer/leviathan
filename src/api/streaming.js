export function subscribe(token, stream, callback) {
    // The user timeline is called "home" in the timeline API but "user" in the streaming API
    if (stream === "home") stream = "user"
    function listener(event) {
        const data = JSON.parse(event.data)
        if (data.event === "update") {
            callback(JSON.parse(data.payload))
        }
    }
    const socket = new WebSocket(`wss://${token.domain}/api/v1/streaming?access_token=${token.access_token}&stream=${stream}`)
    socket.addEventListener("message", listener)

    return () => {
        socket.close()
    }
}
