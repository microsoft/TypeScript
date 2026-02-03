//// [tests/cases/conformance/es6/destructuring/destructuringTypeAssertionsES5_7.ts] ////

//// [destructuringTypeAssertionsES5_7.ts]
var { x } = <any><any>new Foo;

//// [destructuringTypeAssertionsES5_7.js]
var x = (new Foo).x;
