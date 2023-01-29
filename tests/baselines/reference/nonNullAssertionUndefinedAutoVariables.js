//// [nonNullAssertionUndefinedAutoVariables.ts]
// repro from #52439


//@ts-ignore
let foo;
if (Math.random() > 0.5) {
  foo = "hello";
}
// bar: string | undefined
let bar = foo;

// baz: string
let baz = foo!;


//// [nonNullAssertionUndefinedAutoVariables.js]
"use strict";
// repro from #52439
//@ts-ignore
var foo;
if (Math.random() > 0.5) {
    foo = "hello";
}
// bar: string | undefined
var bar = foo;
// baz: string
var baz = foo;
