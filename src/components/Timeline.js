import { Component, h } from "preact"
import { getTimelinesHome } from "src/api/timelines"
import style from "src/style"
import { bluegrey600 } from "src/colors"

const ss = style.namespace("Timeline").addRules({
    root: {
        flex: "1",
        overflow: "auto",
        maxWidth: "600px",
    },
    toot: {
        borderBottom: `1px solid ${bluegrey600}`,
    },
})

class Toot extends Component {
    render({ content, account: { acct } }) {
        return (
            <div class={ss("toot")}>
                <div>{acct}</div>
                <div dangerouslySetInnerHTML={{ __html: content}} />
            </div>
        )
    }
}

export default class Timeline extends Component {
    componentWillMount() {
        this.loadTimeline()
    }

    async loadTimeline() {
        this.setState({ loading: true })
        const timeline = await getTimelinesHome(this.props.token)
        this.setState({ loading: false, timeline })
    }

    render({ type }, { loading, timeline }) {
        if (loading) return <div class={ss("root")}>Loading...</div>

        console.log(timeline)
        return (
            <div class={ss("root")}>
                {timeline.map((toot) => <Toot key={toot.id} {...toot} />)}
            </div>
        )
    }
}
