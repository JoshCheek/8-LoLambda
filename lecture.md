Why it's interesting
--------------------

Who made it?
------------

Alonzo Church made it in the 30s. Note that Church was Alan Turing's thesis advisor, hence the "Church Turing thesis" which approximately says that Turing Machines and the Lambda Calculus define the same abilities. So if you're excited about Turing Machines, then this is similarly exciting!

Another very influential person was Haskell Curry, who reduced the lambda calculus even further, creating yet another definition of computability called combinatory logic. This guy has three programming languages named after him, and at least one cat that I know of.


Translating our code to the lambda calculus
-------------------------------------------

What we did above is fine in JavaScript, but it violates the constraints of the lambda calculus. So lets amend our code to conform.

Original:

```js
function TRUE(trueCase, falseCase)  { return trueCase  }
function FALSE(trueCase, falseCase) { return falseCase }
// rest of the code
```

There is no mechanism to name a function, so we will assign them to variables instead.

```js
var TRUE  = function(trueCase, falseCase) { return trueCase  }
var FALSE = function(trueCase, falseCase) { return falseCase }
// rest of the code
```

The lambda calculus is so pared down that lambdas can only take one argument! To take multiple arguments, then, we need multiple functions. This is known as "currying", yet another thing named after Haskell Curry.

```js
var TRUE  = function(trueCase) { return function(falseCase) { return trueCase  } }
var FALSE = function(trueCase) { return function(falseCase) { return falseCase } }
// rest of the code
```

To lessen the syntactic burden, lets use JavaScript's fat arrow. We remove `function` and add a fat arrow between the arguments and the body:

```js
var TRUE  = function(trueCase) { return (falseCase) => { return trueCase  } }
var FALSE = function(trueCase) { return (falseCase) => { return falseCase } }
// rest of the code
```

Once more:

```js
var TRUE  = (trueCase) => { return (falseCase) => { return trueCase  } }
var FALSE = (trueCase) => { return (falseCase) => { return falseCase } }
// rest of the code
```

With the fat arrow, if we have a single expression (as we always do in the lambda calculus), we can omit the curlies and the `return`, it will then implicitly return like Ruby does.

```js
var TRUE  = (trueCase) => { return (falseCase) => trueCase  }
var FALSE = (trueCase) => { return (falseCase) => falseCase }
// rest of the code
```

Once more:

```js
var TRUE  = (trueCase) => (falseCase) => trueCase
var FALSE = (trueCase) => (falseCase) => falseCase
// rest of the code
```

When there is only one argument, the fat arrow doesn't require parentheses around the argument list.

```js
var TRUE  = (trueCase) => falseCase => trueCase
var FALSE = (trueCase) => falseCase => falseCase
// rest of the code
```

Once more:

```js
var TRUE  = trueCase => falseCase => trueCase
var FALSE = trueCase => falseCase => falseCase
// rest of the code
```

The lambda calculus does not have assignment, variables can only be set by being received as arguments.

```js
(TRUE => {
  var FALSE = trueCase => falseCase => falseCase
  return // rest of the code
})(trueCase => falseCase => trueCase)
```

Once more

```js
(TRUE => FALSE => {
  return // rest of the code
})(trueCase => falseCase => trueCase)
  (trueCase => falseCase => falseCase)
```

Now that we have the rest of the code on a single line, we can get rid of the curlies and return again.

```js
(TRUE => FALSE => // rest of the code
)(trueCase => falseCase => trueCase)
 (trueCase => falseCase => falseCase)
```

Notice how we call it once with the definition of true, and it returns to us a function that receives the definition of false. Then we call that function with the definition of false. This is "currying", we receive the arguments one at a time and we pass them one at a time.

Go ahead and try translating the if statement to match these constraints :)

This is what I wound up with:

```js
(TRUE => FALSE => IF => {
  console.log(IF(TRUE)("pass")("fail"))
  console.log(IF(FALSE)("fail")("pass"))
})

// TRUE
(trueCase => falseCase => trueCase)

// FALSE
(trueCase => falseCase => falseCase)

// IF
(bool => trueCase => falseCase => bool(trueCase)(falseCase))
```


The lambda Calculus is lazy (fix our `if` statement)
----------------------------------------------------

There is one more difference we need to account for. The lambda calculus
evaluates its expressions lazily, but JavaScript does it eagerly. This means
JavaScript evaluates the branches before passing them to the if statement.
This will mess up our base cases when we do recursion.

We'll deal with this by wrapping inputs to `IF` in lambdas.

```js
console.log(IF(TRUE)(_=>"pass")(_=>"fail"))
console.log(IF(FALSE)(_=>"fail")(_=>"pass"))
```

And then calling whichever one is returned by the boolean.
But calling them requires an argument,
and that value must be a lambda since that's all we have to work with,
but nothing should ever be done with that lambda.
If it's ever called, we'd like our program to explode so that we know
there's a bug, so we'll call this function `dynamite` and its body will
use JavaScript's `throw` to cause an explosion.

```js
bool => trueCase => falseCase => {
  var dynamite = (arg => { throw(`KABOOM! Called with ${arg}`) })
  return bool(trueCase)(falseCase)(dynamite)
}
```

And now, use the refactoring you learned earlier to remove the variable.
I wound up with this:

```js
(TRUE => FALSE => IF => {
  console.log(IF(TRUE)(_=>"pass")(_=>"fail"))
  console.log(IF(FALSE)(_=>"fail")(_=>"pass"))
})

// true
(trueCase => falseCase => trueCase)

// false
(trueCase => falseCase => falseCase)

// if
( (dynamite => bool => trueCase => falseCase =>
    bool(trueCase)(falseCase)(dynamite))
  (arg => { throw(`KABOOM! Called with ${arg}`) })
)
```


Representing Numbers
--------------------

Alonzo Church came up with an encoding for numbers called "Church numerals"
They're very similar to the `reduce` function that you may be familiar with.

A number is a function (as everything is in the λ calculus).
It receives a function to be run, and an input to run it on.
It then runs the function with the input, some number of times.
How many times? Well, that's what determines which number it is :)
After each time it calls the function, it uses the output as the next input.

So, assume the variables `n0, n1, ...` are church numerals for the given number.
Then we could use them like this:

```js
n0(ary => ary.concat(ary.length))([])  // => []
n1(ary => ary.concat(ary.length))([])  // => [0]
n2(ary => ary.concat(ary.length))([])  // => [0, 1]
n3(ary => ary.concat(ary.length))([])  // => [0, 1, 2]
```

And we could convert a Church numeral into it's JavaScript equivalent like this:

```js
n0(n => n+1)(0)  // => 0
n1(n => n+1)(0)  // => 1
n2(n => n+1)(0)  // => 2
n3(n => n+1)(0)  // => 3
```

Define the numbers `n1` through `n3`. This is what I came up with:

```js
var n0 = f => arg => arg
var n1 = f => arg => n0(f)(f(arg))
var n2 = f => arg => n1(f)(f(arg))
var n3 = f => arg => n2(f)(f(arg))
```

Now, it's annoying to have to define every number you might ever want to use,
and we can see that their structure is repetative, so to ease this, why don't
you creat an `inc` function, which takes a number and increments it.
Ie `inc(n0) // => n1`.  This is what I came up with:

```js
var inc = n => f => arg => n(f)(f(arg))
```

Go ahead and define `add`, `mul`, `isZero`, `areEqual`.
Now define `pred`, which returns `0` if the number is zero,
and `n-1` otherwise.
For extra credit, define `sub` (this one took some thinking).

For extra extra credit, define `divide` which performs integer division
(truncates remainders). If multiplication is repeated addition,
then division is repeated subtraction, so you can implement division,
by counting the number of times you need to subtract before the divisor
is larger than the dividend. eg:

```
17/5
= 1 + 12/5
= 1 + 1 + 7/5
= 1 + 1 + 2/5
= 1 + 1 + 1 + 0   // integer division, remainders are truncated
= 3
```


Linked Lists
------------

To represent a collection, we will use a data structure known as a linked list.
We will modifiy our slightly, as a consequence of the constraints of the lambda
calculus (ie because it doesn't have a `null` pointer).

* Our linked list will be a chain of "nodes".
* A node will store three values:
  1. A boolean we can use to ask if the node is empty
  2. A piece of data (often called the "head", "first", or "car")
  3. A link to the next node (often called the "tail", "rest", or "cdr")
* Our empty list will
  * return dynamite for the data (the list is empty, you can't ask for its value and then use it!)
  * Return the empty list for its successor.
    For now, we'll cheat by using `var` to have it reference itself.
    We can come back and fix this once we have a Y combinator, which will allow
    for self reference :)

We might represent the list with arrays like this:

```js
// construct an empty list
var EMPTY_LIST = null

// check if the node is the empty list
var IS_EMPTY   = node => node === null
var HAS_ANY    = node => !IS_EMPTY(node)

// construct a non-empty list
var CONS  = head => tail => [head, tail]

// get the list's data
var DATA = node => node[0]

// get the next node in the list
var NEXT = node => node[1]

// iterate over these three items and print them out
var node = CONS(1)(
           CONS(2)(
           CONS(3)(
           EMPTY_LIST)))
while(HAS_ANY(node)) {
  console.log(DATA(node))
  node = NEXT(node)
}
```


So, we need to make definitions for the functions above:

```js
let TRUE       = t => f => t
let FALSE      = t => f => f
let NOT        = b => b(FALSE)(TRUE)
let BOOL_TO_JS = b => b(true)(false)

let n0         = f => v => v
let n1         = f => v => n0(f)(f(v))
let n2         = f => v => n1(f)(f(v))
let n3         = f => v => n2(f)(f(v))
let NUM_TO_JS  = churchN => churchN(n => n+1)(0)

var CONS       = data => nextNode => fn => fn(FALSE)(data)(nextNode)
var HEAD       = node => node(isNil => head => tail => head)
var NEXT       = node => node(isNil => head => tail => tail)
var IS_EMPTY   = node => node(isNil => head => tail => isNil)
var HAS_ANY    = node => NOT(IS_EMPTY)
var EMPTY_LIST = fn => fn(TRUE)(EMPTY_LIST)(EMPTY_LIST)

var node = CONS(n1)(
           CONS(n2)(
           CONS(n3)(
           EMPTY_LIST)))

// JS to test it works
while( BOOL_TO_JS(HAS_ANY(node)) ) {
  console.log( NUM_TO_JS(HEAD(node)) )
  node = NEXT(node)
}
```

For extra credit, define `map`, `reduce`, and pick a few other fun ones
from this list: `$ ruby -e 'p Enumerable.instance_methods'`


Y-Combinator
------------

```js
let Y     = (builder => f => arg => f(builder(builder)(f))(arg))
            (builder => f => arg => f(builder(builder)(f))(arg))

let PRINT = toPrint => {
  console.log(toPrint)
  return toPrint
}

let TRUE   = t => f => t
let FALSE  = t => f => f
let IF     = (dynamite => bool => trueCase => falseCase =>
               bool(trueCase)(falseCase)(dynamite))
             (arg => { throw(`KABOOM! Called with ${arg}`) })

let JS_TO_BOOL = bool => bool ? TRUE : FALSE

let NOOP   = arg => NOOP

Y(recur => n => {
  IF(JS_TO_BOOL(n!=0))
    (() => recur(PRINT(n)-1))
    (NOOP)
})(10)

```


----------------------

* Maybe I do one big one, they do several small ones that add up to the big one?

The way to create primitives in the lambda calculus is to ask what they are
used for, and then make a lambda that does this. True and false are used to
select between two options.
