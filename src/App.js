import React, { Component } from 'react'
import CodeMirror           from 'react-codemirror'
import ReactMarkdown        from 'react-markdown'
import './App.sass'

import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/hopscotch.css'
import 'codemirror/mode/javascript/javascript.js'


class Navbar extends Component {
  // <a className="PageLink" key={index} onClick={() => this.props.setPage(page)}>
  render() {
    const links = this.props.sections.map((sec, index) =>
      <a className="SectionLink" key={index}>
        {sec.segments[0].body.split("\n")[0]}
      </a>)
    return <div className="Navbar">{links}</div>
  }
}

class MarkdownSegment extends Component {
  render() {
    // dangerouslySetInnerHTML={{ __html: "<p>hi</p>"}} />
    // className="MarkdownSegment"
    return <ReactMarkdown
      containerProps={{className: "MarkdownSegment"}}
      source={this.props.segment.body}
    />
  }
}

class CodeBlockSegment extends Component {
  constructor(props) {
    super(props)
    // id, name?, body,
    this.state = {
      code: this.props.segment.body, // iffy
      options: {
        lineNumbers: true,
        autofocus:   false, // maybe provide this in the metadata?
        mode:        "javascript",
        theme:       'solarized',
      },
    }
  }

  updateCode(newCode) {
    this.setState({code: newCode})
  }
  render() {
    return <CodeMirror
      value={this.state.code}
      onChange={(code) => this.updateCode(code)}
      options={this.state.options}
    />
  }
}

class Section extends Component {
  buildSegment(segProps, key) {
    switch(segProps.type) {
      case "md":
        return <MarkdownSegment key={key} segment={segProps} />
      case "codeBlock":
        return <CodeBlockSegment key={key} segment={segProps} />
      case "solution":
        // FIXME: maybe should be a hidden immutable code block, idk.
        // For now, just ignore it
        return null
      case "test":
        // FIXME: should have some sort of display that's like
        // the output of a test framework
        return null
      default:
        throw(`Wat type is this: ${segProps.type}`)
    }
  }

  render() {
    const section = this.props.section
    return <div className="Section">
      {section.segments.map(this.buildSegment)}
    </div>
  }
}

class App extends Component {
  render() {
    const appState = this.props.appState
    const crntIdx  = appState.currentSection || 6
    const current  = appState.sections[crntIdx]

    return <div className="App">
      <Navbar sections={appState.sections} current={current} />
      <Section section={current}/>
    </div>
  }
}

export default App;
