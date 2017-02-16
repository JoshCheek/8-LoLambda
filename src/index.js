import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import state from '../lecture/lecture.json'

if(!state.currentSection)
  state.currentSection = state.sections[0].id
console.log(state)

const render = () =>
  ReactDOM.render(
    <App
      appState={state}
      setCurrent={setCurrent}
      saveCode={saveCode}
    />,
    document.getElementById('root'))
render()

function setCurrent(id) {
  state.currentSection = id
  render()
}

function saveCode(id, body) {
  // TODO: functions is empty
  console.log(state.functions)
  state.functions[id].body = body
  render()
}
