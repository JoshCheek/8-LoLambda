META id: updatingBools
META name: Updating our bools

Updating our bools
------------------

So translate this definition of true in the same way we just did.

```js
META id: true
META name: TRUE
function(trueCase, falseCase) { return trueCase }
```

```test
META for:  true
META name: TRUE returns the first value
assertEqual("first", TRUE("first")("second"))
```



And this definition of false.

```js
META id: false
META name: FALSE
function(trueCase, falseCase) { return falseCase }
```

```test
META for:  false
META name: FALSE returns the second value
assertEqual("second", FALSE("first")("second"))
```



And this definition of if

```js
META id: ifEager
META name: IF
function(boolean, trueCase, falseCase) {
  return boolean(trueCase, falseCase)
}
```

```test
META for:  ifEager
META name: IF with a true boolean returns the true case
META needs: true false

assertEqual('first', IF(TRUE)('first')('second'))
```

```test
META for:  ifEager
META name: IF with a false boolean returns the false case
META needs: true false

assertEqual('second', IF(FALSE)('first')('second'))
```
