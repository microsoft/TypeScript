//// [tests/cases/compiler/webworkerIterable.ts] ////

//// [webworkerIterable.ts]
// This API is only in webworker
importScripts("")

// This should not raise a compiler error
const f = new FormData()
for (const element of f) {
  element.length
}


//// [webworkerIterable.js]
importScripts("");
const f = new FormData();
for (const element of f) {
    element.length;
}
