8Lambda
=======

8th Light University talk about the Lambda Calculus.


What is the lambda calculus?
----------------------------

It's one of a handful of popular definitions of computation. This means we can formally reason about what a computer can do by reasoning about what the lambda calculus can do.

In the lambda calculus, a lambda is a function. So if you know JavaScript, you already know what a lambda is! This expression in lambda calculus: `λx.x` is this expression in JavaScript: `function(x) { return x }` If you know Ruby, these are procs / blocks (there is a difference, but it's not important now).

They use the word "Lambda" because it was written by mathematicians, and mathematicians like to use single letters. When they ran out of letters, they went to the Greek alphabet. Lambda is basically the Greek equivalent to our letter "L", and it means the same thing that "function" means in JavaScript.

My dictionary says "calculus" is "a particular method or system of calculation or reasoning". If you only had functions to work with (no numbers, no strings, no assignments, no objects, etc), you'd have to create a system of reasoning to get anything done.

So the lambda calculus is just a way to reason about a programming language that has lambdas, but nothing else.


Why it's interesting
--------------------

Another popular definition of computability is the Turing Machine, hence phrases like "turing complete" which implies that something can be used as a programming language.

IDK if this is real, but I like to think of these two definitions as giving rise to two different branches of programming. The turing machine leads to procedural languages, where the programmer specifies the instructions that the machine should perform. The lambda calculus leads to functional languages, where the programmer uses a declarative mathematical notation to reason about a problem.

So if you like Clojure, Haskell, ML, and Elm, well their foundation is the lambda calculus. Even if not, it's worth playing with because ideas from the lambda calculus have permeated most languages at this point. For instance, we've already shown their prevalence in JavaScript and Ruby.


Who made it?
------------

Alonzo Church made it in the 30s. Note that Church was Alan Turing's thesis advisor, hence the "Church Turing thesis" which approximately says that Turing Machines and the Lambda Calculus define the same abilities. So if you're excited about Turing Machines, then this is similarly exciting!

Another very influential person was Haskell Curry, who reduced the lambda calculus even further, creating yet another definition of computability called combinatory logic. This guy has three programming languages named after him, and at least one cat that I know of.


How does it work?
-----------------

Alright, the lambda calculus has three things in it:

* **functions** these take inputs and return an output (called a "lambda abstractions")
* **variables** where the functions store their arguments
* **function calls** so that you can run the function! (called an "application")

That's it. Nothing else. No even numbers. No true / false. No if statements. No machine instructions.


Key insight
-----------

When we say something like `31 + 9`, this doesn't mean anything until we define what `31` is, what `9` is, and what `+` is!

Why is assembly so fascinating? Because this magical expression suddenly makes sense! We can finally see how `31` is represented in binary, we can see how it translates to a sequence of electrical values that are stored in hardware. And what of addition? Just a circuit that takes those electrical signals as inputs and outputs electrical signals that correspond to `40`, their sum!

The lambda calculus is no different, we must define what `31` means and what `9` means and then we must must create a function that can take them as inputs and return a value that we consider to be the sum, `40`.


Defining `true`, `false`, and `if`
----------------------------------

The way to create primitives in the lambda calculus is to ask what it is used for, and then make a lambda that does this. True and false are used to select between two options.

So, `true` is a lambda that takes two values and returns the first, and `false` is a lambda that takes two values and returns the second.

```js
function TRUE(trueCase, falseCase)  { return trueCase  }
function FALSE(trueCase, falseCase) { return falseCase }
```

An if statement takes a boolean and the two bodies. It calls the boolean with the two bodies, letting the boolean choose between them.

```js
function IF(boolean, trueCase, falseCase) { return boolean(trueCase, falseCase) }
```

Lets try it out

```js
IF(TRUE,  'first', 'second') // => 'first'
IF(FALSE, 'first', 'second') // => 'second'
```


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


----------------------

* Define y combinator?

```js
function abc() {}
// becomes
var abc = () => {}
```

```js
var abc = (x) => x * x
abc(3)
// becomes
((abc) => abc(3))((x) => x * x)
```

* Maybe I do one big one, they do several small ones that add up to the big one?
