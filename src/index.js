import { h, render } from "preact"
import App from "src/components/App"
import style from "src/style"

const ss = style.namespace("body").addRules({
    root: {
        margin: 0,
        height: "100vh",
        display: "flex",
        flex: 1,
        fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
        fontSize: "14px",
    },
})

document.body.className = ss("root")

render(<App />, document.body)
