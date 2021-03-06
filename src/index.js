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
  state.functions         = Object.assign({}, state.functions, localStorageState.functions)
  const currentSection    = localStorageState.currentSection
  if(currentSection)
    state.currentSection  = currentSection
}

if(!state.currentSection) state.currentSection = state.sections[0].id

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
  saveCode(codeBlock.id, body)
  codeBlock = Object.assign({}, codeBlock, {body: body})
  const tests = testsFor(codeBlock.id)
  tests.forEach(test => {
    setTimeout(() => {
      const status = runTest(test, codeBlock)
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

function runTest(test, codeBlock) {
  // wrap the test and body in code to set the local variables
  let code = wrapCode(codeBlock, test.body)
  code = (test.needs||"").split(/ +/).filter(s => s.length)
          .reduce((inner, depId) => wrapCode(findSegment(depId), inner), code)
  console.log(code)

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
    if(       val === true)        return `true`
    if(       val === false)       return `false`
    throw new Error(`Cannot inspect the val b/c it's not one of the handfull of things I coded into this inspect function. Here's toString: ${val}`)
  }
  function assertEqual(expected, actual) {
    if(expected === actual) return true
    throw new Error(`Expected ${testInspect(expected)} got ${testInspect(actual)}`)
  }
}

function wrapCode(codeBlock, toWrap) {
  let codeBlockBody = state.functions[codeBlock.id].body
  let wrapper = ``
  if(codeBlock.name)
    wrapper += `const ${codeBlock.name} = (${codeBlockBody})\n`
  else
    wrapper += `${codeBlockBody}\n`

  return (codeBlock.needs||"").split(/ +/).filter(s => s.length).reduce((inner, depId) => {
    return wrapCode(findSegment(depId), inner)
  }, wrapper + toWrap)
}

function findSegment(id) {
  for(let sec of state.sections) {
    for(let seg of sec.segments) {
      if(seg.id === id)
        return seg
    }
  }
  throw new Error(`Could not find segment ${id}`)
}
