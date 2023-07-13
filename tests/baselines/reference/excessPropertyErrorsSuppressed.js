//// [tests/cases/compiler/excessPropertyErrorsSuppressed.ts] ////

//// [excessPropertyErrorsSuppressed.ts]
var x: { a: string } = { a: "hello", b: 42 };  // No error


//// [excessPropertyErrorsSuppressed.js]
var x = { a: "hello", b: 42 }; // No error
