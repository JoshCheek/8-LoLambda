import React, { Component } from 'react'
import CodeMirror           from 'react-codemirror'
import ReactMarkdown        from 'react-markdown'
import classNames           from 'classnames'

import './App.sass'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/hopscotch.css'
import 'codemirror/mode/javascript/javascript.js'


class Navbar extends Component {
  render() {
    return <div className="Navbar">{
      this.props.sections.map((sec, index) => this.linkFor(sec, index))
    }</div>
  }

  linkFor(section, index) {
    const classes = classNames({
      SectionLink: true,
      current: section.id === this.props.current.id,
    })
    return <a
      className={classes}
      key={index}
      onClick={() => this.props.setCurrent(section.id)}
    >{section.name}</a>
  }
}

class MarkdownSegment extends Component {
  render() {
    // dangerouslySetInnerHTML={{ __html: "<p>hi</p>"}} />
    // className="MarkdownSegment"
    // Options are at https://github.com/rexxars/react-markdown#options
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
    const id = this.props.segment.id
    this.state = {
      code: this.props.appState.functions[id].body,
      // preserveScrollPosition: true,

      // Options are at https://codemirror.net/doc/manual.html#config
      options: {
        lineNumbers:        true,
        mode:               "javascript",
        theme:              'solarized',
        autofocus:          false,        // maybe provide this in the metadata?
        scrollbarStyle:     null,         // hide scrollbars
        cursorScrollMargin: 40,           // scrolls 2 lines before the edge

        // other maybe useful options:
        // readOnly:      true,
        // keymap: ...,
        // extraKeys ...,
      },
    }
  }

  setCode(newCode) {
    this.setState({code: newCode})
  }

  segmentId() {
    return this.props.segment.id
  }

  saveCode(code) {
    this.setCode(code)
    this.props.saveCode(this.segmentId(), code)
  }

  runTests() {
    this.props.runTests(this.props.segment, this.state.code)
  }

  reset() {
    this.props.resetTests(this.segmentId())
    this.saveCode(this.props.segment.body)
  }

  render() {
    return <div className="CodeBlock">
      <CodeMirror
        value={this.state.code}
        onChange={(code) => this.setCode(code)}
        options={this.state.options}
      />
      <div className="buttons">
        <button onClick={() => this.runTests()}>Run Tests</button>
        <button onClick={() => this.saveCode(this.state.code)}>Save</button>
        <button onClick={() => this.reset()}>Reset</button>
      </div>
    </div>
  }
}

class TestSegment extends Component {
  render() {
    const segment = this.props.segment
    const classes = classNames({
      TestSegment:           true,
      [segment.status.type]: true,
    })
    return <div className={classes}>
      {this.renderName()}
      {this.renderMessage()}
      <hr />
      {this.renderCode()}
    </div>
  }
  renderName() {
    return <div>{this.props.segment.name}</div>
  }
  renderMessage() {
    const message = this.props.segment.status.message
    if(message) return <div className="message">{message}</div>
  }
  renderCode() {
    // toggle visibility and hilight?
    return <pre>{this.props.segment.body}</pre>
  }
}

class Section extends Component {
  buildSegment(segProps, key) {
    switch(segProps.type) {
      case "md":
        return <MarkdownSegment key={key} segment={segProps} />
      case "codeBlock":
        return <CodeBlockSegment
          appState={this.props.appState}
          key={key}
          segment={segProps}
          saveCode={this.props.saveCode}
          runTests={this.props.runTests}
          resetTests={this.props.resetTests}
        />
      case "solution":
        // FIXME: maybe should be a hidden immutable code block, idk.
        // For now, just ignore it
        return null
      case "test":
        return <TestSegment
          appState={this.props.appState}
          key={key}
          segment={segProps}
        />
      default:
        throw new Error(`Wat type is this: ${segProps.type}`)
    }
  }

  render() {
    const build = (seg, idx) => this.buildSegment(seg, `${seg.id}-${idx}`)
    return <div className="Section">
      {this.props.section.segments.map(build)}
    </div>
  }
}

class App extends Component {
  render() {
    const appState = this.props.appState
    let current  = appState.sections.find(sec => sec.id === appState.currentSection)
    // current = appState.sections.find(sec => sec.id === "letThereBeBooleans")

    return <div className="App">
      <Navbar sections={appState.sections} current={current} setCurrent={this.props.setCurrent} />
      <Section
        appState={appState}
        section={current}
        saveCode={this.props.saveCode}
        runTests={this.props.runTests}
        resetTests={this.props.resetTests}
      />
    </div>
  }
}

export default App;
