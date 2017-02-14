import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import state from '../lecture/lecture.json'

if(!state.currentSection)
  state.currentSection = state.sections[0].id

const render = () =>
  ReactDOM.render(
    <App appState={state} setCurrent={setCurrent}/>,
    document.getElementById('root'))

const setCurrent = (id) => {
  state.currentSection = id
  render()
}

render()
