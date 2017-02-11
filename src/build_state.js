function Build() {
  throw("idk what this should be")
}

Build.fromMarkdownBody = function(body) {
  const section = {
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
