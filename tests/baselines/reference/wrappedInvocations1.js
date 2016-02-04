//// [wrappedInvocations1.ts]
var v = this
  .foo()
  .bar()
  .baz();

//// [wrappedInvocations1.js]
var v = this
    .foo()
    .bar()
    .baz();
