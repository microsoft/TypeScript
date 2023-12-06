//// [tests/cases/compiler/wrappedIncovations1.ts] ////

//// [wrappedIncovations1.ts]
var v = this
  .foo()
  .bar()
  .baz();

//// [wrappedIncovations1.js]
var v = this
    .foo()
    .bar()
    .baz();
