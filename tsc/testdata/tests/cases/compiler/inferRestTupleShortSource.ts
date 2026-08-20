// @strict: true

// Regression test: tsgo panics when inferring [...rest, ...T] from a tuple shorter than fixed-arity constraint

function f<T extends [string]>(args: [...string[], ...T]) {
  // ...
}

f([])
