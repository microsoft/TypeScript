//// [tests/cases/conformance/es6/destructuring/destructuringTypeAssertionsES5_6.ts] ////

//// [destructuringTypeAssertionsES5_6.ts]
var { x } = <any>new Foo;

//// [destructuringTypeAssertionsES5_6.js]
"use strict";
var { x } = new Foo;
