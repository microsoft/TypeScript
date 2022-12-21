// @skipLibCheck: true
// @lib: es2020,webworker,webworker.iterable
// @target: es2020

// This API is only in webworker
importScripts("")

// This should not raise a compiler error
const f = new FormData()
for (const element of f) {
  element.length
}
