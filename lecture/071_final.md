META id: conclusion
META name: Conclusion

Conclusion
----------

So, after all of that, we have our final if statement!
You can copy it into a file
and then run that file with node.
If our booleans work correctly, then it will print "PASS"
twice!

```js
META id: finalIf
(TRUE => FALSE => IF => {
  const pass = (_ => console.log("PASS"))
  const fail = (_ => console.log("FAIL"))
  IF(TRUE)(pass)(fail)
  IF(FALSE)(fail)(pass)
})(
  // true
  trueCase => falseCase => trueCase
)(
  // false
  trueCase => falseCase => falseCase
)(
  // if
  boolean => trueCase => falseCase =>
    boolean(trueCase)(falseCase)(_=>_)
)
```
