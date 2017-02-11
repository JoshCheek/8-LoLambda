import Build from './build_state'

describe('Building the inital state out of sections', function() {
  xit('adds the markdown files to the sections in the order they are provided', () => {
    expect(true).toEqual(true)
  })
  it('allows the section to declare an id with initial lines of "META id: sectionId"')
    // otherwise id is nil
  it('throws an error if the id collides')

  describe('currentSection', function() {
    it('is null')
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