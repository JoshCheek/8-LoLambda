import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'
import './App.sass'
import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/hopscotch.css'
import 'codemirror/mode/javascript/javascript.js'


class Navbar extends Component {
  render() {
    return <div className="Navbar">
      {this.props.pages.map((page, index) => this.buildPageLink(page, index))}
    </div>
  }

  buildPageLink(page, index) {
    return <a className="PageLink" key={index} onClick={() => this.props.setPage(page)}>
      {page.name}
    </a>
  }
}

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: `// Code\n(a) => a * a`,
      options: {
        lineNumbers: true,
        autofocus:   true,
        mode:        "javascript",
        theme:       'solarized',
      },
    }
  }
  updateCode(newCode) {
    this.setState({code: newCode})
  }
  render() {
    const page = this.props.page
    return <div className="Page">
      <h2>{page.name}</h2>
      <p>{page.content}</p>
      <CodeMirror value={this.state.code}
                  onChange={(code) => this.updateCode(code)}
                  options={this.state.options}
      />
    </div>
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      functions: {
      },
      currentPageIndex: 0,
      pages: [
        { name: "Name 1", content: "First content" },
        { name: "Name 2", content: "Second content" },
      ],
    }
  }

  render() {
    const state = this.state
    const currentPage = state.pages[state.currentPageIndex]
    const setPage = (page) => {
      this.setState({currentPageIndex: state.pages.indexOf(page)})
    }
    return <div className="App">
      <Navbar pages={state.pages} setPage={setPage}/>
      <Page page={currentPage}/>
    </div>
  }
}

export default App;
