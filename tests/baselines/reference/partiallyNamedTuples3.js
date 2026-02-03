//// [tests/cases/conformance/types/tuple/named/partiallyNamedTuples3.ts] ////

//// [partiallyNamedTuples3.ts]
declare const tuple: [number, name: string, boolean, value: number, string];

const output = ((...args) => args)(...tuple);


//// [partiallyNamedTuples3.js]
"use strict";
var output = (function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
}).apply(void 0, tuple);
