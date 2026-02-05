//// [tests/cases/conformance/types/tuple/wideningTuples1.ts] ////

//// [wideningTuples1.ts]
declare function foo<T extends [any]>(x: T): T;

var y = foo([undefined]);
y = [""];

//// [wideningTuples1.js]
"use strict";
var y = foo([undefined]);
y = [""];
