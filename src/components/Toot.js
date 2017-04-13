import { Component, h } from "preact"
import style from "src/style"
import bound from "src/bound"
import { bluegrey600, darkHintText } from "src/colors"

const ss = style.namespace("root").addRules({
    root: {
        paddingTop: "5px",
    },
    content: {
        display: "flex",
        borderBottom: `1px solid ${bluegrey600}`,
    },
    reblogAuthor: {
        color: darkHintText,
        paddingLeft: "70px",
        marginBottom: "5px",
    },
    avatar: {
        marginRight: "10px",
    },
    account: {
        fontWeight: "bold",
    },
})

export default class Toot extends Component {

    renderToot(toot) {
        return (
            <div class={ss("content")} onClick={bound(this, "onClick")}>
                <div class={ss("avatar")}>
                    <img src={toot.account.avatar} width="60" height="60" />
                </div>
                <div>
                    <div class={ss("account")}>{toot.account.acct}</div>
                    <div dangerouslySetInnerHTML={{ __html: toot.content}} />
                </div>
            </div>
        )
    }

    render(toot) {
        return (
            <div class={ss("root")}>
                {toot.reblog && (
                    <div class={ss("reblogAuthor")}>{toot.account.acct} boosted</div>
                )}
                {this.renderToot(toot.reblog || toot)}
            </div>
        )
    }

    onClick() {
        if (__DEV__) {
            console.log(this.props)
        }
    }

}
