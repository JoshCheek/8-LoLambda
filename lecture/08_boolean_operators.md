META id: booleanOperators
META name: Extra: Boolean operators

Boolean Operators
-----------------

### not

`NOT` takes a boolean and returns a boolean.

```js
META id: not
META name: NOT
META needs: true false if
// I've put a little bit in place to reduce size of this step
// go ahead and run it to see what's wrong with this definition
bool => TRUE(bool)(bool)
```

```solution
META for: not
bool => bool(FALSE)(TRUE)
```

```test
META for: not
META name: !true = false
const result = NOT(TRUE)
assertEqual(false, result(true)(false))
```
```test
META for: not
META name: !false = true
const result = NOT(FALSE)
assertEqual(true, result(true)(false))
```


### and

`AND` is an operator that takes two booleans.
If the first is false, it returns first.
Otherwise it returns the second. Note that
this is consistent with how many languages work,
including JavaScript:

```js
META id: trueAndFalseInJS
META isReadOnly: true
0 && 0          // => 0
0 && 1          // => 0
1 && 0          // => 0
1 && 1          // => 1

true && "hello" // => "hello"
null && "hello" // => null
```

Implement AND in the lambda calculus, it takes two booleans and returns a boolean.

```js
META id: and
META name: AND
META needs: not
b1 => b2 => FALSE
```

```solution
META for: and
b1 => b2 => b1(b2)(b1)
```


```test
META for: and
META name: f&f = f
const result = AND(FALSE)(FALSE)
assertEqual(false, result(true)(false))
```
```test
META for: and
META name: f&t = f
const result = AND(FALSE)(TRUE)
assertEqual(false, result(true)(false))
```
```test
META for: and
META name: t&f = f
const result = AND(TRUE)(FALSE)
assertEqual(false, result(true)(false))
```
```test
META for: and
META name: t&t = t
const result = AND(TRUE)(TRUE)
assertEqual(true, result(true)(false))
```

### or

Implement OR in the lambda calculus

```js
META id: or
META name: OR
META needs: and
// less hand-holding here, now you need to think about
// the signature in order to define it!
```

```solution
META for: or
b1 => b2 => b1(b2)(b1)
```


```test
META for: or
META name: f|f = f
const result = OR(FALSE)(FALSE)
assertEqual(false, result(true)(false))
```
```test
META for: or
META name: f|t = f
const result = OR(FALSE)(TRUE)
assertEqual(true, result(true)(false))
```
```test
META for: or
META name: t|f = f
const result = OR(TRUE)(FALSE)
assertEqual(true, result(true)(false))
```
```test
META for: or
META name: t|t = t
const result = OR(TRUE)(TRUE)
assertEqual(true, result(true)(false))
```

### xor

Implement XOR in the lambda calculus. Xor stands for "exclusive or",
and it returns true when they are not equal. If you get stuck on this one,
just skip it and move on :)

```js
META id: xor
META name: XOR
META needs: or
// This one was pretty tricky for me, remember that you can use
// multiple lines (helps with readability), and you can use
// AND, OR, and NOT, from your definitions above.
```

```solution
META for: xor
b1 => b2 =>
  OR
    (AND
      (b1)
      (NOT(b2)))
    (AND
      (NOT(b1))
      (b2))
```

```test
META for: xor
META name: (f != f) = f
const result = XOR(FALSE)(FALSE)
assertEqual(false, result(true)(false))
```
```test
META for: xor
META name: (f != t) = t
const result = XOR(FALSE)(TRUE)
assertEqual(true, result(true)(false))
```
```test
META for: xor
META name: (t != f) = t
const result = XOR(TRUE)(FALSE)
assertEqual(true, result(true)(false))
```
```test
META for: xor
META name: (t != t) = f
const result = XOR(TRUE)(TRUE)
assertEqual(false, result(true)(false))
```
