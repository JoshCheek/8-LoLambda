import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import initialState from '../lecture/lecture.json'

let state = initialState
if(!state.currentSection) state.currentSection = state.sections[0].id
state.currentSection = 'letThereBeBooleans'
console.log(state)

const root = document.getElementById('root')

render()

function render() {
  console.log(state)
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
      runAndSaveTest(test)
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

function runAndSaveTest(test) {
  console.log(test)
  // run test
  // save test result
}
