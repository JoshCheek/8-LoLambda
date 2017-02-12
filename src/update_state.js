'use strict'
export default function update(state, event, data) {
  switch(event) {
    case "RUN_TEST":
      break
    default:
      throw(`Unknown event: ${event}`)
  }
}
