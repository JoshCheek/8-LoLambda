const IF = (boolean => trueCase => falseCase =>
  boolean(trueCase)(falseCase))
const FALSE = (trueCase => falseCase => falseCase)
const TRUE = (trueCase => falseCase => trueCase)
const AND = (b1 => b2 => b1(b1)(b2))
const result = AND(FALSE)(TRUE)

console.log(result)
// result(true)(false))
