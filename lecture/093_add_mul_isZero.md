META id: addMulisZero
META name: Extra: isZero, add, mul

### isZero

The `isZero` function returns true if you give it zero, false otherwise.
You'll have access to your earlier definitions through the names `TRUE` and `FALSE`.
The trick to this one is to call the number with the right argumuments.

```js
META id: isZero
META name: isZero
META needs: true false
```

```solution
META for: isZero
n => n(_ => FALSE)(TRUE)
```

```test
META for: isZero
META name: isZero(n0) = TRUE
META needs: n4
const toBool = bool => bool(true)(false)
assertEqual(true, toBool(isZero(n0)))
```

```test
META for: isZero
META name: isZero(n1) = FALSE
META needs: n4
const toBool = bool => bool(true)(false)
assertEqual(false, toBool(isZero(n1)))
```

```test
META for: isZero
META name: isZero(n2) = FALSE
META needs: n4
const toBool = bool => bool(true)(false)
assertEqual(false, toBool(isZero(n2)))
```


### Add

The `add` function takes two numbers and returns the number that is their sum.
If you get confused, think through the interface implied by that statement.


```js
META id: add
META name: add
META needs: succ
```

```solution
META for: add
na => nb =>
  na(SUCC)(nb)
```

```test
META for: add
META name: 0+1=1
META needs: n4
assertEqual(1, add(n0)(n1)(n => n + 1)(0))
```
```test
META for: add
META name: 1+0=1
META needs: n4
assertEqual(1, add(n1)(n0)(n => n + 1)(0))
```
```test
META for: add
META name: 1+1=2
META needs: n4
assertEqual(2, add(n1)(n1)(n => n + 1)(0))
```
```test
META for: add
META name: 2+3=5
META needs: n4
assertEqual(5, add(n2)(n3)(n => n + 1)(0))
```
```test
META for: add
META name: 3+2=5
META needs: n4
assertEqual(5, add(n3)(n2)(n => n + 1)(0))
```
```test
META for: add
META name: For non counting integers
META needs: n4
assertEqual("xxxoxxx", add(n1)(n2)(c => "x"+c+"x")("o"))
```


### Mul

If we think of multiplication as repeated addition,
then `2*3` is `0+2+2+2` or `0+3+3`, so we can define
multiplication in terms of addition.

The solution to this is horribly inefficient,
don't let that prevent you from finding the solution :)

```js
META id: mul
META name: mul
META needs: add isZero
```

```solution
META for: mul
na => nb =>
  na(add(nb))(n0)
```

```test
META for: mul
META name: 0*1=0
META needs: n4
assertEqual(0, mul(n0)(n1)(n => n + 1)(0))
```
```test
META for: mul
META name: 1*0=0
META needs: n4
assertEqual(0, mul(n1)(n0)(n => n + 1)(0))
```
```test
META for: mul
META name: 1*1=1
META needs: n4
assertEqual(1, mul(n1)(n1)(n => n + 1)(0))
```
```test
META for: mul
META name: 1*2=2
META needs: n4
assertEqual(2, mul(n1)(n2)(n => n + 1)(0))
```
```test
META for: mul
META name: 2*1=2
META needs: n4
assertEqual(2, mul(n2)(n1)(n => n + 1)(0))
```
```test
META for: mul
META name: 2*3=6
META needs: n4
assertEqual(6, mul(n2)(n3)(n => n + 1)(0))
```
```test
META for: mul
META name: 3*2=6
META needs: n4
assertEqual(6, mul(n3)(n2)(n => n + 1)(0))
```
