8-Lolambda
==========

Hosted at
[https://internetsfamo.us/lambda](https://internetsfamo.us/lambda)

Material about the lambda calculus for a talk I gave at 8th Light University.

Notes to self for if I want to use it again at some point:

* Keybindings to jump to the next code segment?
* Keybindings to jump to next and previous pages?
* Figure out how to get webpack to auto build the lecture.json when one of the markdown files is saved
* Using the index as a key means it might think the elements are the same even
  when they change.
* The nested structure of the state is a pita to work with and leads to things like
  conflation of data that defines things (eg test) and data that stores state
  (eg test result)
* On the "translate" page, it would be nice if it auto saved the code, but didn't
  have the buttons (or if there were tests for them) (or if you just edited one
  code block instead of jumping between them.
* Test results do not persist their state (for the reason stated above)
* How do they get out of having to forward a million arguments to every component?
  (maybe this is what the redux libs do?)
* Is there a shorthand to access props and state?
* Why is it not running my `src/build_state.test.js` anymore? -.-

Additional material I didn't get to:


Representing Numbers
--------------------

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


Who made it?
------------

Alonzo Church made it in the 30s. Note that Church was Alan Turing's thesis advisor, hence the "Church Turing thesis" which approximately says that Turing Machines and the Lambda Calculus define the same abilities. So if you're excited about Turing Machines, then this is similarly exciting!

Another very influential person was Haskell Curry, who reduced the lambda calculus even further, creating yet another definition of computability called combinatory logic. This guy has three programming languages named after him, and at least one cat that I know of.

