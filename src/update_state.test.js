'use strict'
// https://facebook.github.io/jest/docs/expect.html#content

import Build  from './build_state'
import Update from './update_state'

const build = (...markdowns) =>
  Build.stateFromMarkdownBodies(markdowns)

const newState = () => build()

describe('Updating the state', () => {
  describe('RUN_TEST event', () => {
    // does this also need hooks for test results?
    // eg "UPDATE_TEST_RESULT" for after the test is run?
    // run test (id, body)
    it('finds the tests for the code block, runs them, and updates their status')
    it('uses the body it was given in the event')
    it('TODO: what happens if they timeout?')
    it('TODO: what about dependencies? eg we want TRUE to be available in the env')
  })

  describe('SAVE_RESULT event', () => {
    // save result (id, body)
    it('copies the code block\'s body into its function in state.functions')
  })

  describe('GOTO event', () => {
    // goto (id) // section | component
    it('sets the currentSection to the section for the id')
    it('TODO: what about when the id is for a segment? is there a way to jump to that loc? maybe via URL fragment')
  })

  describe('EDIT_CODE event', () => {
    // editCode (id, body)
    it('saves the body into its code segment')
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
