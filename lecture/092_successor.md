META id: numberSuccessor
META name: Extra: Successor

A number's successor
--------------------

So, we've hand-coded the numbers we want to use, and if we were particularly
clever, then we might have written them in terms of the number that is one less
than them. If you did that, you'll see that every number takes a similar form.

Here is one possibility:

```js
META id: myNumberSolutions1
META isReadOnly: true
var n0 = f => arg => arg
var n1 = f => arg => n0(f)(f(arg))
var n2 = f => arg => n1(f)(f(arg))
var n3 = f => arg => n2(f)(f(arg))
```

And here is another:

```js
META id: myNumberSolutions2
META isReadOnly: true
var n0 = f => arg => arg
var n1 = f => arg => f(n0(f)(arg))
var n2 = f => arg => f(n1(f)(arg))
var n3 = f => arg => f(n2(f)(arg))
```

Now, it's annoying to have to define every number you might ever want to use,
and we can see that their structure is repetative. So to ease this, why don't
you create a `succ` function, which takes a number and returns its successor
(increments it). For example, `succ(n0) // => n1`.


```js
META id: succ
META name: succ
YOUR_CODE_HERE
```

```solution
META for: succ
n => f => arg => n(f)(f(arg))
```

```test
META for: succ
META name: The successor of 0 is 1
META needs: n0
assertEqual(1, succ(n0)(n => n+1)(0))
```

```test
META for: succ
META name: The successor of the successor of 0 is 2
META needs: n0
assertEqual(2, succ(succ(n0))(n => n+1)(0))
```

```test
META for: succ
META name: The third successor of 2 is 3
META needs: n2
assertEqual(3, succ(n2)(n => n+1)(0))
```

```test
META for: succ
META name: The 10th successor of 0 is 10
META needs: n0
var n = succ(succ(succ(succ(succ(succ(succ(succ(succ(succ(n0))))))))))
assertEqual(10, n(n => n+1)(0))
```

