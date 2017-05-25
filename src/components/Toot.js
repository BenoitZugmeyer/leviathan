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
  urlPath: {
    opacity: "0.5",
  },
  paragraph: {
    margin: "10px 0",
  },
})

function assert(condition) {
  if (!condition) throw new Error("Assertion failed")
}

function parseTootContent(content) {
  return new DOMParser().parseFromString(content, "text/html").body
}

function formatURL(link) {
  return <span>{link.host}<span class={ss("urlPath")}>{link.pathname}</span></span>
}

function formatTootContentLink(node) {
  assert(node.nodeName === "A")
  let textContainer
  let textPrefix
  if (node.classList.contains("mention")) {
    assert(node.childNodes.length === 2)
    assert(node.childNodes[0].nodeName === "#text")
    textPrefix = node.childNodes[0].textContent
    textContainer = node.childNodes[1]
  }
  else {
    textPrefix = ""
    textContainer = node
  }

  let text
  if (textContainer.childNodes.length === 3) {
    assert(textContainer.childNodes[0].nodeName === "SPAN")
    assert(textContainer.childNodes[1].nodeName === "SPAN")
    assert(textContainer.childNodes[2].nodeName === "SPAN")
    text = formatURL(node)
  }
  else if (textContainer.childNodes.length > 0) {
    assert(textContainer.childNodes.length === 1)
    assert(textContainer.childNodes[0].nodeName === "#text")
    text = textContainer.textContent
  }
  else {
    return // no link
  }
  return (
        <a href={node.getAttribute("href")} target="_blank">
            {textPrefix}{text}
        </a>
  )
}


function formatTootContentParagraph(node) {
  const children = []
  for (const child of node.childNodes) {
    if (child.nodeName === "#text") {
      children.push(child.textContent)
    }
    else if (child.nodeName === "BR") {
      children.push(<br />)
    }
    else if (child.nodeName === "SPAN" && child.getAttribute("class") === "h-card") {
      children.push(formatTootContentLink(child.childNodes[0]))
    }
    else if (child.nodeName === "SPAN") {
      children.push(formatTootContentParagraph(child))
    }
    else {
      children.push(formatTootContentLink(child))
    }
  }
  return <p class={ss("paragraph")}>{children}</p>
}

function formatTootContent(node) {
  assert(node.nodeName === "BODY")
  if (node.firstElementChild && node.firstElementChild.nodeName === "P") {
    const result = []
    for (const child of node.childNodes) {
      assert(child.nodeName === "P")
      result.push(formatTootContentParagraph(child))
    }
    return result
  }

  return formatTootContentParagraph(node)
}

function hasAvatar(account) {
  return !account.avatar.endsWith("/original/missing.png")
}

export default class Toot extends Component {

  renderToot(toot) {
    const content = formatTootContent(parseTootContent(toot.content))
    return (
            <div class={ss("content")} onClick={bound(this, "onClick")}>
                <div class={ss("avatar")}>
                    {hasAvatar(toot.account) && <img src={toot.account.avatar} width="60" height="60" />}
                </div>
                <div>
                    <div class={ss("account")}>{toot.account.acct}</div>
                    <div>{content}</div>
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
