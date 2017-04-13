import { Component, h } from "preact"
import { getTimelinesHome } from "src/api/timelines"
import Toot from "src/components/Toot"
import style from "src/style"

const ss = style.namespace("Timeline").addRules({
    root: {
        flex: "1",
        overflow: "auto",
        maxWidth: "600px",
    },
})

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

        return (
            <div class={ss("root")}>
                {timeline.map((toot) => <Toot key={toot.id} {...toot} />)}
            </div>
        )
    }
}
