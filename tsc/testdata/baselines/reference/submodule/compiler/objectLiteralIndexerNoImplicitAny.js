//// [tests/cases/compiler/objectLiteralIndexerNoImplicitAny.ts] ////

//// [objectLiteralIndexerNoImplicitAny.ts]
interface I {
    [s: string]: any;
}

var x: I = {
    p: null
}

//// [objectLiteralIndexerNoImplicitAny.js]
var x = {
    p: null
};
