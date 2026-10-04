//// [tests/cases/compiler/inferRestTupleShortSource.ts] ////

//// [inferRestTupleShortSource.ts]
// Regression test: tsgo panics when inferring [...rest, ...T] from a tuple shorter than fixed-arity constraint

function f<T extends [string]>(args: [...string[], ...T]) {
  // ...
}

f([])


//// [inferRestTupleShortSource.js]
"use strict";
// Regression test: tsgo panics when inferring [...rest, ...T] from a tuple shorter than fixed-arity constraint
function f(args) {
    // ...
}
f([]);
