META id: linkedListDefn
META name: Build our lists

Build our lists
---------------

* Our linked list will be a chain of "nodes".
* A node will store three values:
  1. A boolean to tell us if the node is empty
  2. A piece of data (often called the "head", "first", or "car")
  3. A link to the next node (often called the "tail", "rest", or "cdr")
* Our empty list will call the decider (see the previous section) with
  * True to say it is empty
  * A throwaway list for the data (it has no data)
  * A throwaway list for the next node (it has no next node)

You'll need to edit several of these together for our tests to work.

Define the `EMPTY_LIST` here:

```js
META id: empty_list
META name: EMPTY_LIST
META needs: true
// the EMPTY_LIST, it's a valid node all on its own,
// so it receives a decider, and then calls that decider with:
//   `TRUE` to signal that we are empty
//   a throwaway lambda for the data (the empty list has no data)
//   a throwaway lambda for the next item (the empty list has no next item)
// and returns whatever the decider decided
```

```solution
META for: empty_list
decider =>
  decider(TRUE)(_ => _)(_ => _)
```

And define `PREPEND` here (this often called "cons" for "construct").

```js
META id: prepend
META name: PREPEND
META needs: false
// To prepend data to a list, we need to receive the data and the next list node.
// Then we will receive a decider, which we call with:
//   `FALSE` to signal that we are not empty
//   the data
//   the next list node
// and we return whatever the decider decided
```

```solution
META for: prepend
data => nextNode =>
  decider =>
    decider(FALSE)(data)(nextNode)
```

And now, define `IS_EMPTY` here:

```js
META id: is_empty
META name: IS_EMPTY
// IS_EMPTY receives a list node and calls it with a decider
//   returns the first argument (the one that tells us whether its empty)
//   ignores the second argument (the data)
//   ignores the third argument (the link to the next node)
```

```solution
META for: is_empty
list =>
  list(isEmpty => data => nextNode => isEmpty)
```

```test
META for: is_empty
META name: The empty list is empty
META needs: empty_list prepend
const result = IS_EMPTY(EMPTY_LIST)
assertEqual(true, result(true)(false))
```

```test
META for: is_empty
META name: After prepending an item to a list, it is not empty
META needs: empty_list prepend
const list   = PREPEND("data")(EMPTY_LIST)
const result = IS_EMPTY(list)
assertEqual(false, result(true)(false))
```

Sweet, now we want to be able to get those values back out.
We'll name this function `DATA`, though you may have seen it before
under the name `car` or `head` or `first`

```js
META id: data
META name: DATA
// DATA Receives the list node to get the data from
// calls the node with a decider that:
//   ignores the first argument (the one that tells us whether its empty)
//   returns the second argument (the data)
//   ignores the third argument (the link to the next node)
```

```solution
META for: data
list =>
  list(isEmpty => data => nextNode => data)
```

```test
META for: data
META name: Data returns the data
META needs: empty_list prepend
const listB  = PREPEND("b")(EMPTY_LIST)
const listA  = PREPEND("a")(listB)
assertEqual("a", DATA(listA))
assertEqual("b", DATA(listB))
```

And now define `NEXT`, the function that returns the next list node:

```js
META id: next
META name: NEXT
// NEXt Receives the list node to get the data from
// calls the node with a decider that:
//   ignores the first argument (the one that tells us whether its empty)
//   ignores the second argument (the data)
//   returns the third argument (the link to the next node)
```

```solution
META for: next
list =>
  list(isEmpty => data => nextNode => nextNode)
```

```test
META for: next
META name: Next returns the next list node
META needs: empty_list prepend data is_empty
const listC  = PREPEND("c")(EMPTY_LIST)
const listB  = PREPEND("b")(listC)
const listA  = PREPEND("a")(listB)

assertEqual("b", DATA(NEXT(listA)))
assertEqual("c", DATA(NEXT(NEXT(listA))))

const isListAfterCEmpty = IS_EMPTY(NEXT(NEXT(NEXT(listA))))
assertEqual(true, isListAfterCEmpty(true)(false))
```
