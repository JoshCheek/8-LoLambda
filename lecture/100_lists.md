META id: linkedListIntro
META name: Extra: List Intro

Collections via linked lists
----------------------------

So, we now have logic (booleans) and numbers represented,
what about collections like arrays? Well, for that,
we can use a linked list.

A linked list creates a collection by wrapping each piece
of data in a "node". The node stores the data and a link
to the next node. The very last node is called the "empty list".

This structure is very natural in functional programming,
in fact, they added some syntax and convenience to the lambda
calculus in order to make a language that had first class
**LIS**t **p**rocessing, which was eventually namedd lisp!

Here is one way we might implement a list using JavaScript objects:

```js
META id: jsList
META isReadOnly: true

var EMPTY_LIST = {isEmpty: true}
var PREPEND    = data => next => ({isEmpty: false, data: data, next: next})
var IS_EMPTY   = node => node.isEmpty
var HAS_ANY    = node => !IS_EMPTY(node)
var DATA       = node => node.data
var NEXT       = node => node.next

var list = PREPEND("a")(
           PREPEND("b")(
           PREPEND("c")(
           EMPTY_LIST)))

// Iterate over the chars and print them out
var node = list
while(HAS_ANY(node)) {
  console.log(DATA(node))
  node = NEXT(node)
}
```
