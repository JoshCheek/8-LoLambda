'use strict'
import Build from './build_state'
const fromMd = Build.fromMarkdownBodies

describe('Building the inital state out of sections', function() {

  it('adds the markdown files to the sections list', () => {
    expect(fromMd([]).sections.length).toEqual(0)
    expect(fromMd(['a']).sections.length).toEqual(1)
    expect(fromMd(['a', 'b']).sections.length).toEqual(2)
  })

  it('allows the section to declare an id with initial lines of "META id: sectionId"', () => {
    let idFor = md => fromMd([md]).sections[0].id
    expect(idFor(`abc`)).toEqual(null)
    expect(idFor(`META id: customId\nabc`)).toEqual('customId')
  })

  // it('throws on unknown metadata')  // idk if I actually want this

  it('throws an error if provided ids collide', () => {
    // not provided, no collision
    fromMd(['a', 'a'])

    // provided but different
    fromMd(['META id: theId\na', 'META id: notTheId\na'])

    // how do I assert that it should collide here?
    expect(() => fromMd(['META id: theId\na', 'META id: theId\na']))
      .toThrowError(/theId/)
  })

  it('adds the markdown files to the sections in the order they are provided', () => {
    let ids

    ids = fromMd(['META id: a', 'META id: b']).sections.map(sec => sec.id)
    expect(ids).toEqual(['a', 'b'])

    ids = fromMd(['META id: b', 'META id: a']).sections.map(sec => sec.id)
    expect(ids).toEqual(['b', 'a'])
  })

  describe('currentSection', function() {
    it('is null', () => {
      // on null, it'll just have to discoveer the first section
      // no sense specifying that it could be set here when that same work
      // will have to be duplicated later anyway
      expect(fromMd(['META id: a']).currentSection).toEqual(null)
    })
  })

  describe('function', function() {
    it('is an empty object by default', () => {
      expect(fromMd(['META id: a', 'b']).functions).toEqual({})
    })
  })
})


describe('Sections', function() {
  const sec = md => fromMd([md]).sections[0]
  const seg = md => sec(md).segments[0]

  describe('segments', function() {
    it('allows both the section and the segments to have metadata based on whether they are the first line or not', () => {
      let section = sec(`META id: sectionID\n\nMETA id: segmentID`)
      expect(section.id).toEqual('sectionID')
      expect(section.segments[0].id).toEqual('segmentID')
    })

    it('allows each segment to have metadata')
  })

  describe('Markdown segments', function() {
    it('sets the markdown to the segments\'s body', () => {
      expect(seg("a").body).toEqual("a")
      expect(seg("a\nb").body).toEqual("a\nb")
    })

    it('allows the component to declare its own metadata after the leading line', () => {
      expect(seg(`\nMETA id: 1`).id).toEqual('1')
    })

    xit('strips leading META info and leading/newlines', () => {
      expect(sec(`META id: 1\na\nb`).body).toEqual(`a\nb`)
      expect(sec(`META id: 1\na\nb`).body).toEqual(`a\nb`)
      expect(sec(`META id: 1\n\na\nb`).body).toEqual(`a\nb`)
      expect(sec(`META id: 1\nMETA name: whatever\na\nb`).body).toEqual(`a\nb`)

      expect(sec(`META id: 1\n\nMETA id:2\na\nb`).body).toEqual(`a\nb`)
      expect(sec(`META id: 1\n\nMETA id:2\na\nb`).body).toEqual(`a\nb`)
      expect(sec(`META id: 1\n\nMETA id:2\n\na\nb`).body).toEqual(`a\nb`)
      expect(sec(`META id: 1\n\nMETA id:2\nMETA name: whatever\na\nb`).body).toEqual(`a\nb`)
    })

    xit('concludes the section when it discovers a different kind of component', () => {
      expect(sec("a\n```js\n1\n```\nb").body).toEqual("a")
    })
  })

  describe('CodeBlock segments', function() {
    it('is entered in a markdown code block for js')
    it('can specify an id in its metadata')
    it('throws an error if the id collides')
    it('can specify a name in its metadata')
    it('has an initialBody of the post-metadata text')
    context('when it has a name', function() {
      it('adds the id, name, and body to the state\'s functions, keyed off the id')
    })
  })

  describe('Solution segments', function() {
    it('must declare the CodeBlock its for in its metadata')
    it('stores the post metadata as the body')
  })

  describe('Test segments', function() {
    it('must declare the CodeBlock its for in its metadata')
    // should it have/require id and name?
    it('stores the post metadata as the body')
    it('has a status of pending')
  })
})
