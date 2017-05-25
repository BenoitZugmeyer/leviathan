import { Component, h } from "preact"
import style from "src/style"
import { bluegrey600 } from "src/colors"

const ss = style.namespace("Header").addRules({
  root: {
    borderBottom: `1px solid ${bluegrey600}`,
    boxSizing: "border-box",
    width: "100%",
    padding: "5px 10px",
    textAlign: "center",
  },

  wrapper: {
    maxWidth: "600px",
    display: "flex",
    margin: "0 auto",
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    inherit: "input",
  },
})

export default class Header extends Component {
  render({ onLogout, account: {acct} }) {
    return (
            <div class={ss("root")}>
                <div class={ss("wrapper")}>
                    <div>
                        Welcome {acct}!
                    </div>
                    <button class={ss("button")} onClick={onLogout}>Logout</button>
                </div>
            </div>
    )
  }
}
