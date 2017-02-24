META id: letThereBeBooleans
META name: Let there be booleans

Let there be booleans
---------------------

So if we only have lambdas, how do we do things like if statements?
Well, everything must be a lambda, so true and false are lambdas.
And since true and false are used to select between two options
(a true case and a false case) we'll give them those two options
and let them select the appropriate one.


```js
META id: firstBools

// `true`  is a lambda (function) that takes two values and returns the first,
// `false` is a lambda (function) that takes two values and returns the second.
function TRUE(trueCase, falseCase)  { return /* EDIT HERE */ }
function FALSE(trueCase, falseCase) { return /* EDIT HERE */ }
```

```solution
META for: firstBools
function TRUE(trueCase, falseCase)  { return trueCase  }
function FALSE(trueCase, falseCase) { return falseCase }
```

```test
META for:  firstBools
META name: TRUE returns the first value
assertEqual("first", TRUE("first", "second"))
```

```test
META for:  firstBools
META name: FALSE returns the second value
assertEqual("second", FALSE("first", "second"))
```


Now, lets write an if statement! The **key realization**
here is that `boolean` is either `TRUE` or `FALSE`
and whichever one it is it, it will do the correct thing.

```js
META id: firstIf
META needs: firstBools
// Delegate the work to the boolean
function IF(boolean, trueCase, falseCase) {
  return /* EDIT HERE */
}
```

```solution
META for: firstIf
function IF(boolean, trueCase, falseCase) {
  return boolean(trueCase, falseCase)
}
```

```test
META for:  firstIf
META name: IF with a true boolean returns the true case
assertEqual('first', IF(TRUE,  'first', 'second'))
```

```test
META for:  firstIf
META name: IF with a false boolean returns the false case
assertEqual('second', IF(FALSE,  'first', 'second'))
```

In object oriented programming, we might call this idea
"polymorphism", the `boolean` can be `TRUE` or `FALSE`,
which have different behaviour, but perform the task
of being a boolean based on how we talk to it,
and what it's role is.
