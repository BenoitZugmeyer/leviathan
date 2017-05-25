import { Component, h } from "preact"
import { retrieveToken, deleteToken } from "src/api/token"
import { verifyCredentials } from "src/api/accounts"
import LoginForm from "src/components/LoginForm"
import Header from "src/components/Header"
import Timeline from "src/components/Timeline"
import bound from "src/bound"
import style from "src/style"

const ss = style.namespace("App").addRules({
  root: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  loading: {

  },
})

export default class App extends Component {

  componentWillMount() {
    this.fetchState()
  }

  async fetchState() {
    this.setState({ loading: true })
    const state = await fetchState()
    this.setState(Object.assign({}, state, { loading: false }))
  }

  render(props, { loading, token, account }) {
    if (loading) return <div class={ss("root", "loading")}>Loading...</div>
    if (!account) {
      return (
                <div class={ss("root")}>
                    <LoginForm onLoggedIn={bound(this, "fetchState")} />
                </div>
      )
    }
    return (
            <div class={ss("root")}>
                <Header account={account} onLogout={bound(this, "logout")} />
                <Timeline token={token} type="home" />
            </div>
    )
  }

  logout() {
    deleteToken()
    this.setState({ account: false })
  }

}

async function fetchState() {
  const token = retrieveToken()
  if (token) {
    const account = await verifyCredentials(token)
    return {
      account,
      token,
    }
  }
  return {
    account: false,
  }
}
