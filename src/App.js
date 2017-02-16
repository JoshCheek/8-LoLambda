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
  // <a className="PageLink" key={index} onClick={() => this.props.setPage(page)}>
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

  updateCode(newCode) {
    this.setState({code: newCode})
  }

  render() {
    const id = this.props.segment.id
    const runTests = () => { }
    const reset = () => this.props.saveCode(id, this.props.segment.body)
    return <div className="CodeBlock">
      <CodeMirror
        value={this.state.code}
        onChange={(code) => this.updateCode(code)}
        options={this.state.options}
      />
      <div className="buttons">
        <button onClick={() => runTests(id)}>Run Tests</button>
        <button onClick={() => this.props.saveCode(id, this.state.code)}>Save</button>
        <button onClick={() => reset(id)}>Reset</button>
      </div>
    </div>
  }
}

class Section extends Component {
  buildSegment(segProps, key) {
    // console.log({omg: this.props.saveCode})
    switch(segProps.type) {
      case "md":
        return <MarkdownSegment key={key} segment={segProps} />
      case "codeBlock":
        return <CodeBlockSegment appState={this.props.appState} key={key} segment={segProps} saveCode={this.props.saveCode} />
        // return <CodeBlockSegment key={key} segment={segProps} saveCode={this.props.saveCode} />
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
      {section.segments.map((seg, idx) => this.buildSegment(seg, idx))}
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
      <Section appState={appState} section={current} saveCode={this.props.saveCode} />
    </div>
  }
}

export default App;
