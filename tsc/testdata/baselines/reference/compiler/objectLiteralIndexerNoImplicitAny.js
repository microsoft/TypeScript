//// [tests/cases/compiler/objectLiteralIndexerNoImplicitAny.ts] ////

//// [objectLiteralIndexerNoImplicitAny.ts]
interface I {
    [s: string]: any;
}

var x: I = {
    p: null
}

//// [objectLiteralIndexerNoImplicitAny.js]
"use strict";
var x = {
    p: null
};
