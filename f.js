const util = require('util')

class CustomError extends Error {
}

function testInspect(val) {
  if(typeof val === 'function')
    return `(${val.toString()})`
  else
    return util.inspect(val)
}

function assertEqual(lhs, rhs) {
  if(lhs === rhs) return true
  throw new CustomError(`Expected \`${testInspect(lhs)}\` to equal \`${testInspect(rhs)}\``)
}

const trueCode  = `trueCase => falseCase => trueCase`
const falseCode = `trueCase => falseCase => falseCase`
const ifCode = `bool => trueCase => falseCase => bool(trueCase)(falseCase)`
const testCode = `
  assertEqual("first",  IF(TRUE)("first")("second"))
  assertEqual("second", IF(FALSE)("first")("second"))
`
let status = 'pending'
try {
  // I could just set them on the global object if they pass their tests
  // Then I don't have to figure out how to do this tree resolution and build up this object

  // Or, looks like we can just set the vars manually and eval'd code will see them
  // so maybe prepend let statements to the string?
  ((code) => {
    let a = 123
    eval(code)
  })('console.log(a)') // logs 123

  // Or, build up this string, but looks pretty painful:
  `(trueCase => falseCase => (${ifCode}))(${trueCode})(${falseCode})`

  eval(code)
  status = 'passed'
} catch(err) {
  status = 'failed'
  console.log(err.constructor === CustomError)
  console.log(err.constructor === SyntaxError)
  console.log(err.message)
}
