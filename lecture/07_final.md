META id: conclusion
META name: Conclusion

Conclusion
----------

So, after all of that, we have our final if statement :)

```js
META id: finalIf
(TRUE => FALSE => IF => {
  console.log(IF(TRUE)(_=>"pass")(_=>"fail"))
  console.log(IF(FALSE)(_=>"fail")(_=>"pass"))
})

// true
(trueCase => falseCase => trueCase)

// false
(trueCase => falseCase => falseCase)

// if
( (dynamite => bool => trueCase => falseCase =>
    bool(trueCase)(falseCase)(dynamite))
  (arg => arg)
)
```
