META id: makeIfLazy
META name: Make if lazy


The lambda Calculus is lazy (fix our `if` statement)
----------------------------------------------------

There is one more difference we need to account for. The lambda calculus
evaluates its expressions lazily, but JavaScript does it eagerly. This means
JavaScript evaluates the branches before passing them to the if statement.
This will mess up our base cases when we do recursion.

We'll deal with this by wrapping inputs to `IF` in lambdas.

```js
META id: roExampleIf
META isReadOnly: true
IF(TRUE)(_=>"pass")(_=>"fail")
IF(FALSE)(_=>"fail")(_=>"pass")
```

And then calling whichever one is returned by the boolean.
But calling them requires an argument,
and that value must be a lambda since that's all we have to work with.
But nothing should ever be done with that lambda,
so we can use an empty lambda for it.

```js
META id: if
META name: IF
boolean => trueCase => falseCase =>
  boolean(trueCase)(falseCase)
```

```test
META for:  if
META name: TRUE returns the first value
META needs: true false
assertEqual('first', IF(TRUE)(_=>"first")(_=>"second"))
```

```test
META for:  if
META name: FALSE returns the second value
META needs: true false
assertEqual('second', IF(FALSE)(_=>"first")(_=>"second"))
```
