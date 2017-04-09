import { Component, h } from "preact"
import ref from "src/ref"
import bound from "src/bound"
import { createToken } from "src/api/token"
import style from "src/style"
import { lime500, red800, darkPrimaryText, lightPrimaryText } from "src/colors"

const ss = style.namespace("LoginForm").addRules({
    root: {
        display: "inline-block",
    },

    form: {
        backgroundColor: lime500,
        color: darkPrimaryText,
        padding: "5px",
    },

    message: {
        backgroundColor: red800,
        color: lightPrimaryText,
        padding: "5px 10px",
        marginBottom: "10px",
    },

    field: {
        display: "block",
        padding: "5px",
        textAlign: "right",
    },

    fieldInput: {
        inherit: "input",
        marginLeft: "10px",
        width: "250px",
    },

    button: {
        inherit: "input",
        display: "block",
        width: "calc(100% - 10px)",
        margin: "5px",
    },
})

function sanitizeDomain(domain) {
    return /^(?:https?:\/\/)?([^\/]*)/.exec(domain)[1]
}

class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.initialValue || "",
        }
    }

    render({ label, type }, { value }) {
        return (
            <label class={ss("field")}>
                { label }
                <input
                    class={ss("fieldInput")}
                    ref={ref(this, "input")}
                    type={type}
                    value={value}
                    onInput={bound(this, "onInput")}
                />
            </label>
        )
    }

    getValue() {
        return this.state.value
    }

    onInput(event) {
        this.setState({ value: event.target.value })
    }
}

export default class LoginForm extends Component {

    render(props, { loading, message }) {
        return (
            <div class={ss("root")}>
                {message && <div class={ss("message")}>{message}</div>}
                <form class={ss("form")} onSubmit={bound(this, "onSubmit")}>
                    <Input ref={ref(this, "server")} type="text" label="Server" initialValue="https://" />
                    <Input ref={ref(this, "email")} type="email" label="Email" />
                    <Input ref={ref(this, "password")} type="password" label="Password" />
                    <button class={ss("button")} disabled={loading}>
                        {loading ? "Loading..." : "Log in"}
                    </button>
                </form>
            </div>
        )
    }

    async onSubmit(event) {
        event.preventDefault()

        const domain = sanitizeDomain(this.server.getValue())
        if (!domain) return this.setState({ message: "Invalid domain" })

        this.setState({ loading: true, message: "" })

        let success, token, message

        try {
            ({ success, token } = await createToken(
                domain,
                this.email.getValue(),
                this.password.getValue(),
            ))
        }
        catch (e) {
            success = false
            message = e.message
        }

        if (!success) {
            this.setState({ message: message || "Invalid credentials" })
        }
        else {
            this.props.onLoggedIn(token)
        }

        this.setState({ loading: false })
    }

}
