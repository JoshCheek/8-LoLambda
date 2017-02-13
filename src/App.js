import React, { Component } from 'react'
// import CodeMirror from 'react-codemirror'
import './App.sass'

import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/hopscotch.css'
import 'codemirror/mode/javascript/javascript.js'


class Navbar extends Component {
  render() {
    const links = this.props.sections.map((sec, index) =>
      <a className="PageLink" key={index}>
        {sec.segments[0].body.split("\n")[0]}
      </a>)
    return <div className="Navbar">{links}</div>
  }

  // buildPageLink(page, index) {
  //   return <a className="PageLink" key={index} onClick={() => this.props.setPage(page)}>
  //     {page.name}
  //   </a>
  // }
}

class Page extends Component {
  // constructor(props) {
  //   super(props)
  //   id, segments
  //   this.state = {
  //     code: `// Code\n(a) => a * a`,
  //     options: {
  //       lineNumbers: true,
  //       autofocus:   true,
  //       mode:        "javascript",
  //       theme:       'solarized',
  //     },
  //   }
  // }
  // updateCode(newCode) {
  //   this.setState({code: newCode})
  // }
  render() {
    const page = this.props.page
    const segment = page.segments[0]
    console.log(segment)
    return <div className="Page">
      {segment.body}
    </div>
      // dangerouslySetInnerHTML={{
      //   __html:
      // }} />

    // const page = this.props.page
    // return <div className="Page">
    //   <h2>{page.name}</h2>
    //   <p>{page.content}</p>
    //   <CodeMirror value={this.state.code}
    //               onChange={(code) => this.updateCode(code)}
    //               options={this.state.options}
    //   />
    // </div>
  }
}

class App extends Component {
  render() {
    const appState = this.props.appState
    const crntIdx  = appState.currentSection || 0
    const current  = appState.sections[crntIdx]
    console.log(current)

    return <div className="App">
      <Navbar sections={appState.sections} current={current} />
      <Page page={current}/>
    </div>
  }
}

export default App;
