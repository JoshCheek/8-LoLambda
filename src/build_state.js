'use strict'

function Build() { throw("idk what this should be") }
export default Build

// TODO: rename: stateFromMarkdownBodies
Build.fromMarkdownBodies = function(markdownBodies) {
  const state = {
    functions:      {},
    sections:       [],
    currentSection: null,
  }

  // build sections
  markdownBodies.forEach(body => {
    const section = Build.sectionFromMd(body)
    state.sections.forEach(other => {
      if(other.id && section.id === other.id)
        throw(`IDs must be unique, but multiple sections had an id of ${section.id}`)
    })
    section.segments.forEach(seg => {
      if(seg.id && findSegment(state.sections, seg.id))
        throw(`IDs must be unique, but multiple segments have an id of ${seg.id}`)
    })
    state.sections.push(section)
  })

  // build functions
  state.sections.forEach(sec => {
    sec.segments.forEach(seg => {
      if(seg.type === 'codeBlock' && seg.name) {
        if(!seg.id)
          throw(`CodeBlock ${seg.name} is missing an id`)
        state.functions[seg.id] = {
          id: seg.id, name: seg.name, body: seg.body
        }
      }
    })
  })

  // validate solutions
  state.sections.forEach(sec => {
    sec.segments.forEach(seg => {
      if(seg.type === 'solution') {
        if(!seg.for)
          throw(`A solution must list the id of the code block it is for`)
        if(!findSegment(state.sections, seg.for))
          throw(`There is a solution for ${seg.for}, but no code block with that id!`)
      }
    })
  })

  // validate code blocks
  state.sections.forEach(sec => {
    sec.segments.forEach(seg => {
      if(seg.type === 'test') {
        if(!seg.for)
          throw(`A test must list the id of the code block it is for`)
        if(!findSegment(state.sections, seg.for))
          throw(`There is a test for ${seg.for}, but no code block with that id!`)
      }
    })
  })


  return state
}


Build.sectionFromMd = function(md) {
  const section = {id: null, segments: [] }
  const mdLines = md.split(`\n`)
  extractMetadata(mdLines, section)

  segmentize(mdLines).filter(notEmptyMd).forEach(lines => {
    const segment = {type: lines.type}
    if(segment.type === 'test')
      segment.status = {type: 'pending'}
    extractMetadata(lines, segment)
    segment.body = lines.join(`\n`)
    section.segments.push(segment)
  })

  return section
}


// =====  Private  =====

function extractMetadata(lines, metadata) {
  let match
  while(lines.length && (match = lines[0].match(/^META (\w+):\s*(.*)/))) {
    metadata[match[1]] = match[2]
    lines.shift()
  }
  while(lines.length && lines[0].match(/^$/))
    lines.shift()
}


// Sort of naive, but not clear that the ones on NPM can do what I want here,
// so just writing this thing for now
function segmentize(lines) {
  const segments = []

  // build the segments out of the lines
  let match, segment = []
  segment.type = segmentType(null)

  lines.forEach(line => {
    // block start
    if(match = line.match(/^```(\w+.*)/)) {
      segments.push(segment)
      segment = []
      segment.type = segmentType(match[1])

    // block end
    } else if(line.match(/^```/)) {
      segments.push(segment)
      segment = []
      segment.type = segmentType(null)

    // content within the current segment
    } else {
      segment.push(line)
    }
  })
  segments.push(segment)

  return segments
}

function notEmptyMd(lines) {
  if(lines.type !== 'md') return true
  const nonemptyLines = lines.filter(line => line.length)
  return nonemptyLines.length !== 0
}

function segmentType(observedType) {
  if(!observedType) return "md"
  switch(observedType) {
    case "js":       return "codeBlock"
    case "solution": return "solution"
    case "test":     return "test"
    default: throw(`Unknown segment type: ${observedType}`)
  }
}

function findSegment(sections, id) {
  for(let section of sections) {
    let seg = section.segments.find(sec => sec.id === id)
    if(seg) return seg
  }
  return null
}
