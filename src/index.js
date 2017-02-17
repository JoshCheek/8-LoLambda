import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import initialState from '../lecture/lecture.json'

let state = initialState
const localStorageName = 'lambdaAppState'
const rawLocalStorageState = localStorage.getItem(localStorageName)
if(rawLocalStorageState) {
  const localStorageState = JSON.parse(rawLocalStorageState)
  state.functions = Object.assign({}, state.functions, localStorageState.functions)
}

if(!state.currentSection) state.currentSection = state.sections[0].id
state.currentSection = 'letThereBeBooleans' // FIXME: delete this, it's just for convenience of "manual testing" >.<
// state.currentSection = 'intro' // FIXME: delete this, it's just for convenience of "manual testing" >.<

const root = document.getElementById('root')

render()

function render() {
  localStorage.setItem(localStorageName, JSON.stringify(state))
  window.state = state
  ReactDOM.render(
    <App
      appState={state}
      setCurrent={setCurrent}
      saveCode={saveCode}
      runTests={runTests}
      resetTests={resetTests}
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

function runTests(codeBlock, body) {
  // { "type": "test",
  //   "status": {
  //     "type": "pending"
  //   },
  //   "for": "firstBools",
  //   "name": "TRUE returns the first value",
  //   "body": "expect(TRUE(\"first\", \"second\")).toEqual(\"first\")",
  //   "id": "__internal_id_11"
  // },
  testsFor(codeBlock.id).forEach(test => {
    setTimeout(() => {
      const status = runTest(test, codeBlock, body)
      updateTestStatus(test.id, status)
      render()
    }, 0)
  })
}

function resetTests(codeBlockId) {
  testsFor(codeBlockId).forEach(test =>
    updateTestStatus(test.id, {type: 'pending'}))
  render()
}

function updateTestStatus(testId, status) {
  let segment, segmentIdx, section, sectionIdx

  state.sections.forEach((sec, secIdx) => {
    if(segment) return
    sec.segments.forEach((seg, segIdx) => {
      if(segment || seg.id !== testId) return
      section    = sec
      sectionIdx = secIdx
      segment    = seg
      segmentIdx = segIdx
    })
  })

  const newSeg = Object.assign({}, segment, {status})
  const newSegments = []
  section.segments.forEach(seg => newSegments.push(seg))
  newSegments[segmentIdx] = newSeg

  const newSec = Object.assign({}, section, {segments: newSegments})
  const newSections = []
  state.sections.forEach(sec => newSections.push(sec))
  newSections[sectionIdx] = newSec

  state = Object.assign({}, state, {sections: newSections})
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

function runTest(test, codeBlock, body) {
  // wrap the test and body in code to set the local variables
  let code = ``
  if(codeBlock.name)
    code += `const ${codeBlock.name} = (${body})\n`
  else
    code += `${body}\n`
  code += test.body

  // eval the test and body to functions
  let status = {type: 'pending'}
  try {
    eval(code)
    status = {type: 'pass'}
  } catch(err) {
    status = {type: 'fail', message: err.message}
  }
  return status

  function testInspect(val) {
    if(typeof val === 'function')  return `(${val.toString()})`
    if(typeof val === 'number')    return ``+val
    if(typeof val === 'string')    return `'${val}'`
    if(typeof val === 'undefined') return `undefined`
    if(       val === null)        return `null`
    throw new Error(`Cannot inspect the val b/c it's not one of the handfull of things I coded into this inspect function. Here's toString: ${val}`)
  }
  function assertEqual(expected, actual) {
    if(expected === actual) return true
    throw new Error(`Expected ${testInspect(expected)} got ${testInspect(actual)}`)
  }
}
