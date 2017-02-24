META id: storingValues
META name: How to store 2 values

How to store two values
-----------------------

We'll start with a skill that we'll need to build
the lists, storing data.
How do you put two things in, and then
at some point later, get them back out?

Well, we know we need to put two things in,
so it must take a first and a second.
It could return either one of them, but then
what about the other?

```js
META id: storeTwo1
META isReadOnly: true
first => second =>
  first // hmmm, what about second?
```

So how do we give these values back to the outside world?
Well, we'll let the user pass us something to let us know
which value they want. In JavaScript, we could do something
like this:

```js
META id: storeTwo2
META isReadOnly: true
const store = first => second => which => {
  if(which === 'first')
    return first
  else
    return second
}
var lc = store("lambda")("calculus")
lc("first")   // => "lambda"
lc("second")  // => "calculus"
```

But we don't have strings in the lambda calculus!
So it will need to pass us a function that can
somehow differentiate between the two values.
In fact, if we push the decision of which value to return
into that function, then it has the ability to choose
whichever one it wants!

```js
META id: storeTwo3
META isReadOnly: true
(store => {
    const lc = store("lambda")("calculus")
    lc(first => second => first)  // => "lambda"
    lc(first => second => second) // => "calculus"
  }
)(
  // Take our two values we want to store
  first => second =>
    // To get them back out, provide a decider
    decider =>
      // Here, decider, you decide, and I'll return
      // the one you give back to me!
      decider(first)(second)
)
```
