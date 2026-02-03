//// [tests/cases/conformance/es6/destructuring/destructuringTypeAssertionsES5_2.ts] ////

//// [destructuringTypeAssertionsES5_2.ts]
var { x } = (<any>foo());

//// [destructuringTypeAssertionsES5_2.js]
var x = foo().x;
