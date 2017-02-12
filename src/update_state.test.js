'use strict'
// https://facebook.github.io/jest/docs/expect.html#content

import Build  from './build_state'
import Update from './update_state'

const build = (...markdowns) =>
  Build.stateFromMarkdownBodies(markdowns)

const newState = () => build()

describe('Updating the state', () => {
  describe('RUN_TEST event', () => {
    // run test (id, body)
  })

  describe('SAVE_RESULT event', () => {
    // save result (id, body)
  })

  describe('GOTO event', () => {
    // goto (id) // section | component
  })

  describe('EDIT_CODE event', () => {
    // editCode (id, body)
  })

  describe('unknown events', () => {
    it('throws an error', () => {
      // known
      Update(newState(), 'RUN_TEST', {})

      //unknown
      expect(() => Update(newState(), 'UNKNOWN_EVENT', {}))
        .toThrowError(/UNKNOWN_EVENT/)
    })
  })
})
