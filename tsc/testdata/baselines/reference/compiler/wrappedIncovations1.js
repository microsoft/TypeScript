//// [tests/cases/compiler/wrappedIncovations1.ts] ////

//// [wrappedIncovations1.ts]
var v = this
  .foo()
  .bar()
  .baz();

//// [wrappedIncovations1.js]
"use strict";
var v = this
    .foo()
    .bar()
    .baz();
