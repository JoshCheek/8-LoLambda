META id: whyMatters
META name: Why it matters

Why the lambda calculus matters
-------------------------------

It's one of a handful of popular definitions of computation.
This means we can formally reason about what a computer can
do by reasoning about what the lambda calculus can do.

Another popular definition of computability is the Turing Machine,
hence phrases like "turing complete" which implies that something
can do everything a turing machine can do, thus it is able to be used
for general purpose programming. The same is true of the lambda calculus,
in fact, Church (who made the lambda calculus) was Alan Turing's thesis
advisor, on what we now call the "Church Turing thesis", the paper
that defines computation and the equivalency between Turing's machine
and Church's lambda calculus.

If you enjoy this material, then there are other definitions as well,
Haskell Curry's "combinatorial logic" builds on the ideas we will learn here,
and to prove his "incompleteness theorem", Kurt Godel had to construct
a programming language **within** mathematics (ie there is some number that
is the program `console.log("hello world")`!).

That's probably difficult to conceive of, how can a number be a program?
The reason it's difficult is you haven't seen patterns like this before,
most of the programming languages we use are very similar. But here, they
created programming where it did not yet exist!
We'll see here how you can go about creating the abstractions we're used to
in contexts that don't have them.
