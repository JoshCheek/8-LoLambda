META id: translateBools
META name: Tranlsating our code

Translating our code to the lambda calculus
-------------------------------------------

What we did is fine in JavaScript, but it violates the constraints of the lambda calculus.
So lets amend our code to conform.

Original:

```js
function TRUE(trueCase, falseCase)  { return trueCase  }
function FALSE(trueCase, falseCase) { return falseCase }
```

There is no mechanism to name a function,
so we need to assign them to variables instead.
I've done it for true, you do it for false.

```js
var TRUE = function(trueCase, falseCase)  { return trueCase  }
function FALSE(trueCase, falseCase) { return falseCase }
```

The lambda calculus is so pared down that lambdas can only take one argument!
To take multiple arguments, then, we need multiple functions.
This is known as "currying", yet another thing named after Haskell Curry.
I've done it for true, you do it for false.

```js
var TRUE  = function(trueCase) { return function(falseCase) { return trueCase  } }
var FALSE = function(trueCase, falseCase) { return falseCase }
```

To lessen the syntactic burden, lets use JavaScript's fat arrow.
We remove `function` and add a fat arrow between the arguments and the body.
Again, do it for false (going to stop saying this now).

```js
var TRUE  = (trueCase) => { return (falseCase) => { return trueCase  } }
var FALSE = function(trueCase) { return function(falseCase) { return falseCase } }
```

With the fat arrow, if we have a single expression
(as we always do in the lambda calculus), we can omit the curlies and the
`return`, it will then implicitly return like Ruby does.

```js
var TRUE  = (trueCase) => { return (falseCase) => trueCase  }
var FALSE = (trueCase) => { return (falseCase) => { return falseCase  } }
```

Once more:

```js
var TRUE  = (trueCase) => (falseCase) => trueCase
var FALSE = (trueCase) => { return (falseCase) => falseCase }
```

When there is only one argument, the fat arrow doesn't require parentheses
around the argument list.

```js
var TRUE  = trueCase => falseCase => trueCase
var FALSE = (trueCase) => (falseCase) => falseCase
```

The lambda calculus does not have assignment,
variables can only be set by being received as arguments.

```js
(TRUE => {
  var FALSE = trueCase => falseCase => falseCase
  // rest of the code would go here
})(trueCase => falseCase => trueCase)
```

That one's a bit tricky, here's what I wound up with in the end:

```js
(TRUE => FALSE => // rest of the code would go here
)(trueCase => falseCase => trueCase)
 (trueCase => falseCase => falseCase)
```

Notice how we call it once with the definition of true,
and it returns to us a function that receives the definition of false.
Then we call that function with the definition of false.
This is "currying", we receive the arguments one at a time and we pass them
one at a time.
