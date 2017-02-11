'use strict'
import Build from './build_state'

describe('Building the inital state out of sections', function() {
  let fromMd = Build.fromMarkdownBodies

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

  xit('throws an error if provided ids collide', () => {
    fromMd(['a', 'a'])                         // not provided, no collision
    fromMd(['META id: 1\na', 'META id: 2\na']) // provided but different

    // how do I assert that it should collide here?
    expect(true).toEqual(false)
    fromMd(['META id: 1\na', 'META id: 1\na'])
  })

  xit('adds the markdown files to the sections in the order they are provided', () => {
    let ids

    ids = fromMd(['META id: a', 'META id: b']).sections.map(sec => sec.id)
    expect(ids).toDeepEqual(['a', 'b'])

    ids = fromMd(['META id: b', 'META id: a']).sections.map(sec => sec.id)
    expect(ids).toDeepEqual(['b', 'a'])
  })

  describe('currentSection', function() {
    xit('is null', () => {
      // on null, it'll just have to discoveer the first section
      // no sense specifying that it could be set here when that same work
      // will have to be duplicated later anyway
      expect(fromMd(['META id: a']).currentSection).toEqual(null)
    })
  })
})


describe('Parsing a section\'s components', function() {
  describe('Markdown components', function() {
    // it('sets the markdown to the segment\'s body')
    it('strips leading META info and leading/newlines')
    it('allows the component to declare an id with initial lines of "META id: markdownID"')
    it('sets the rawMarkdown to the body with the META lines stripped')
    it('concludes the section when it discovers a different kind of component')
  })

  describe('CodeBlock components', function() {
    it('is entered in a markdown code block for js')
    it('can specify an id in its metadata')
    it('throws an error if the id collides')
    it('can specify a name in its metadata')
    it('has an initialBody of the post-metadata text')
    context('when it has a name', function() {
      it('adds the id, name, and body to the state\'s functions, keyed off the id')
    })
  })

  describe('Solution components', function() {
    it('must declare the CodeBlock its for in its metadata')
    it('stores the post metadata as the body')
  })

  describe('Test components', function() {
    it('must declare the CodeBlock its for in its metadata')
    // should it have/require id and name?
    it('stores the post metadata as the body')
    it('has a status of pending')
  })
})
