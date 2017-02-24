META id: howToReadOfficialLiterature
META name: Everyone else's explanations


You can skip this, unless you want to read other explanations,
such as the
[wikipedia](https://en.wikipedia.org/wiki/Lambda_calculus_definition)
page.


Everyone else's explanations
----------------------------

### Important context

The lambda calculus, is a **macro language**.
This means it doesn't "call" a function,
but rather it replaces the call with the code that would have been called.
And then replaces references to the arguments with the code that was passed in.

You can literally think of it like "fancy string substitutions".
The definition of the lambda calculus, then, is the set of rules
for how to perform the string substitution.
Here is an example of how a macro evaluates differently from a function call:

```js
META id: exampleMacro
META isReadOnly: true

// Say f was defined like this, but it was a macro instead of a function
const double = x => x + x

// And maybe we're using it like this:
;[1, 2, 3].forEach(n => console.log(double(n-1)))

// Then a marco would replace "double" with its body
;[1, 2, 3].forEach(n => console.log((x => x + x)(n-1)))

// And then get rid of "x" by replacing it with the code from the argument
;[1, 2, 3].forEach(n => console.log(n-1 + n-1))
```


### Their terminology

* When we say "function", they say "lambda abstraction"
* When we say "variable", they also say "variable",
  but they distingusih between:

  * "bound" variables, a variable that was received as an argument.
  * "free" variables, a variable that comes from a function's context.

  They make these distinctions because it's a macro language,
  so they have to substitute function bodies into their call sites.
  This could lead to collision of names, so they may need to do renaming,
  and you rename free variables differently from bound ones.
* When we say "call the function",
  they say "apply the function to its arguments".
  We think of the call site as being the actor because it runs the function,
  but they think of the function as being the actor because it changes the code
  at the call site.
