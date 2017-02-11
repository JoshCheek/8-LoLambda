// https://facebook.github.io/jest/docs/expect.html#content
function Build() {
  throw("idk what this should be")
}

function extractMetadata(lines, metadata) {
  let match
  while(lines.length && (match = lines[0].match(/^META (\w+):\s*(.*)/))) {
    metadata[match[1]] = match[2]
    lines.shift()
  }
  while(lines.length && lines[0].match(/^$/))
    lines.shift()
}

// TODO: A section does not have a body, that's a segment
Build.fromMarkdownBody = function(body) {
  const section = {
    id: null,
    // body: "",
    segments: [],
  }
  const lines = body.split(`\n`)
  extractMetadata(lines, section)

  const segment = {}
  extractMetadata(lines, segment)
  segment.body = lines.join(`\n`)
  section.segments.push(segment)

  return section
}

Build.fromMarkdownBodies = function(markdownBodies) {
  const state = {
    functions: {
      // id: {id, name, body}
    },
    sections: [],
    currentSection: null,
  }
  markdownBodies.forEach(body => {
    const section = Build.fromMarkdownBody(body)
    state.sections.forEach(other => {
      if(other.id && section.id === other.id)
        throw(`IDs must be unique, but multiple sections had an id of ${section.id}`)
    })
    state.sections.push(section)
  })
  return state
}
export default Build
