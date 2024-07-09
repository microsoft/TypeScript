//// [tests/cases/compiler/wrappedIncovations2.ts] ////

//// [wrappedIncovations2.ts]
var v = this.
  foo().
  bar().
  baz();

//// [wrappedIncovations2.js]
var v = this.
    foo().
    bar().
    baz();
