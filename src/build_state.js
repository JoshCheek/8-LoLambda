function Build() {
  throw("idk what this should be")
}

Build.fromMarkdownBody = function(body) {
  const section = {
    id: null
  }

  let lines = body.split(`\n`),
      match
  while(lines.length && (match = lines[0].match(/^META (\w+):\s*(.*)/))) {
    section[match[1]] = match[2]
    lines.shift()
  }

  return section
}

Build.fromMarkdownBodies = function(markdownBodies) {
  const state = {
    sections: []
    // functions: { id: {id, name, body} }
    // currentSection
  }
  markdownBodies.forEach(body => {
    const section = Build.fromMarkdownBody(body)
    state.sections.push(section)
  })
  return state
}
export default Build
