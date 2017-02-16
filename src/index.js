import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import initialState from '../lecture/lecture.json'

// import std from 'browser-stdout'
// import Mocha from 'mocha/browser-entry'
// import Suite   from 'mocha/lib/suite'
// import Context from 'mocha/lib/suite'
// import Mocha   from 'mocha/lib/mocha'


let state = initialState
if(!state.currentSection) state.currentSection = state.sections[0].id
state.currentSection = 'letThereBeBooleans'

const root = document.getElementById('root')

render()

function render() {
  ReactDOM.render(
    <App
      appState={state}
      setCurrent={setCurrent}
      saveCode={saveCode}
      runTests={runTests}
    />,
    root
  )
}

function setCurrent(id) {
  state = Object.assign({}, state, {currentSection: id})
  render()
}

function saveCode(id, body) {
  const newFn    = Object.assign({}, state.functions[id], {body: body})
  const newFns   = Object.assign({}, state.functions, {[id]: newFn})
  const newState = Object.assign({}, state, {functions: newFns})
  state = newState
  render()
}

function runTests(codeId, body) {
  // { "type": "test",
  //   "status": {
  //     "type": "pending"
  //   },
  //   "for": "firstBools",
  //   "name": "TRUE returns the first value",
  //   "body": "expect(TRUE(\"first\", \"second\")).toEqual(\"first\")",
  //   "id": "__internal_id_11"
  // },
  testsFor(codeId).forEach(test =>
    setTimeout(() => {
      const result = runTest(test, body)
      // FIXME: update the result
      render()
    }, 0))
}

function testsFor(codeId) {
  const tests = []
  state.sections.forEach(sec =>
    sec.segments.forEach(seg =>
      seg.type === 'test' && // solutions can also be for the code block
      seg.for === codeId &&
      tests.push(seg)))
  return tests
}

function runTest(test, body) {
  // wrap the test and body in code to set the local variables
  // eval the test and body to functions
  // invoke the functions with the locals so they are available to the code
  // invoke the test function with the body function
  // catch errors (syntax and assertion)
  // if no error, return passed status
  // if error, return the description (eg syntax error vs failed assertion)
  console.log(test, body)
}
