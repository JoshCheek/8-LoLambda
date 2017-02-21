META id: representingNumbers
META name: Representing Numbers


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
Then we could convert them to their javascript equivalents like this:

```js
META id: usingNumeralsExample2
META isReadOnly: true
n0(n => n+1)(0)  // => 0
n1(n => n+1)(0)  // => 1
n2(n => n+1)(0)  // => 2
n3(n => n+1)(0)  // => 3
```

Or we could build a list of numbers like this:

```js
META id: usingNumeralsExample1
META isReadOnly: true
n0(ary => ary.concat(ary.length))([])  // => []
n1(ary => ary.concat(ary.length))([])  // => [0]
n2(ary => ary.concat(ary.length))([])  // => [0, 1]
n3(ary => ary.concat(ary.length))([])  // => [0, 1, 2]
```

### N0

Go ahead and define n0. This one should be very straight forward.

```js
META id: n0
META name: n0
/* Code for number 0, available in the future as n0 */
f => arg => EDIT_HERE
```

```test
META for: n0
META name: n0 returns the initial input value (test 1)
assertEqual(0,   n0(n => n+1)(0))
```

```test
META for: n0
META name: n0 returns the initial input value (test 2)
assertEqual(100, n0(n => n+1)(100))
```

```test
META for: n0
META name: n0 returns the initial input value (test 3)
assertEqual(0,   n0(n => n+2)(0))
```

### N1

And n1

```js
META id: n1
META name: n1
META needs: n0
/* DEFINE n1 HERE, you do have access to your definition of n0 */
```

```test
META for: n1
META name: n1 passes the input to the function and returns it (test 1)
assertEqual(1,   n1(n => n+1)(0))
```

```test
META for: n1
META name: n1 passes the input to the function and returns it (test 2)
assertEqual(101, n1(n => n+1)(100))
```

```test
META for: n1
META name: n1 passes the input to the function and returns it (test 3)
assertEqual(2,   n1(n => n+2)(0))
```

### N2

And n2 will need to take the output and pass it into the function again.
The best way to do this one is to define it in terms of n1.


```js
META id: n2
META name: n2
META needs: n1
/* DEFINE n2 HERE, you do have access to your definition of n1 */
```

```test
META for: n2
META name: n2 passes the input through the function twice (test 1)
assertEqual(2,   n2(n => n+1)(0))
```

```test
META for: n2
META name: n2 passes the input through the function twice (test 2)
assertEqual(102, n2(n => n+1)(100))
```

```test
META for: n2
META name: n2 passes the input through the function twice (test 3)
assertEqual(4,   n2(n => n+2)(0))
```

### N3

And n3 will similarly pass the output through three times.
The best way to do this one is to define it in terms of n2.


```js
META id: n3
META name: n3
META needs: n2
/* DEFINE n3 HERE, you do have access to your definition of n2 */
```

```test
META for: n3
META name: n3 passes the input through the function three times (test 1)
assertEqual(3,   n3(n => n+1)(0))
```

```test
META for: n3
META name: n3 passes the input through the function three times (test 2)
assertEqual(103, n3(n => n+1)(100))
```

```test
META for: n3
META name: n3 passes the input through the function three times (test 3)
assertEqual(6,   n3(n => n+2)(0))
```

### N4

And n4 will similarly pass the output through three times.
The best way to do this one is to define it in terms of n2.


```js
META id: n4
META name: n4
META needs: n3
/* DEFINE n4 HERE, you do have access to your definition of n3 */
```

```test
META for: n4
META name: n4 passes the input through the function four times (test 1)
assertEqual(4,   n4(n => n+1)(0))
```

```test
META for: n4
META name: n4 passes the input through the function four times (test 2)
assertEqual(104, n4(n => n+1)(100))
```

```test
META for: n4
META name: n4 passes the input through the function four times (test 3)
assertEqual(8,   n4(n => n+2)(0))
```
