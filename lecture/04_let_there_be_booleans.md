META id: letThereBeBooleans
META name: Let there be booleans

Let there be booleans
---------------------

So if we only have lambdas, how do we do things like if statements?
Well, true and false are used to select between two options.
So we'll give them those two options and let them each select from them.


```js
META id: firstBools

// `true`  is a lambda that takes two values and returns the first,
// `false` is a lambda that takes two values and returns the second.
function TRUE(trueCase, falseCase)  { return /* FIXME */  }
function FALSE(trueCase, falseCase) { return /* FIXME */ }
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


Now, lets write an if statement!

```js
META id: firstIf
// An if statement takes a boolean and the two bodies. It calls the boolean
// with the two bodies, letting the boolean choose between them.
function IF(boolean, trueCase, falseCase) { /* FIXME */ }
```

```solution
META for: firstIf
function IF(boolean, trueCase, falseCase) {
  return boolean(trueCase)(falseCase)
}
```

```test
META for:  firstIf
META name: IF with a true boolean returns the true case
META load: firstBools, firstIf

assertEqual('first', IF(TRUE,  'first', 'second'))
```

```test
META for:  firstIf
META name: IF with a false boolean returns the false case
META load: firstBools, firstIf

assertEqual('second', IF(FALSE,  'first', 'second'))
```
