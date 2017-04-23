import { Component, h } from "preact"
import { getTimeline } from "src/api/timelines"
import { subscribe } from "src/api/streaming"
import Toot from "src/components/Toot"
import style from "src/style"

const ss = style.namespace("Timeline").addRules({
    root: {
        flex: "1",
        overflow: "auto",
        maxWidth: "600px",
    },
})

function mergeToots(timeline, toots) {
    if (!timeline) return toots
    const ids = new Set()
    for (const toot of timeline) ids.add(toot.id)
    const newTimeline = []
    for (const toot of toots) {
        if (!ids.has(toot.id)) newTimeline.push(toot)
    }
    newTimeline.push.apply(newTimeline, timeline)
    return newTimeline
}

export default class Timeline extends Component {
    componentWillMount() {
        this.unsubscribe = subscribe(this.props.token, this.props.type, (toot) => {
            this.setState(({ timeline }) => ({
                timeline: mergeToots(timeline, [toot]),
            }))
        })
        this.loadTimeline()
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    async loadTimeline() {
        this.setState({ loading: true })
        const toots = await getTimeline(this.props.token, this.props.type)
        this.setState(({timeline}) => ({ loading: false, timeline: mergeToots(timeline, toots) }))
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
