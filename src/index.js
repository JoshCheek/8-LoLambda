import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import initialState from '../lecture/lecture.json'

let state = initialState
if(!state.currentSection) state.currentSection = state.sections[0].id
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
