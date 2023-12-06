//// [tests/cases/conformance/es6/destructuring/destructuringTypeAssertionsES5_4.ts] ////

//// [destructuringTypeAssertionsES5_4.ts]
var { x } = <any><any>foo();

//// [destructuringTypeAssertionsES5_4.js]
var x = foo().x;
