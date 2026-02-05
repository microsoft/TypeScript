//// [tests/cases/conformance/es6/Symbols/symbolProperty5.ts] ////

//// [symbolProperty5.ts]
var x = {
    [Symbol.iterator]: 0,
    [Symbol.toPrimitive]() { },
    get [Symbol.toStringTag]() {
        return 0;
    }
}

//// [symbolProperty5.js]
"use strict";
var x = {
    [Symbol.iterator]: 0,
    [Symbol.toPrimitive]() { },
    get [Symbol.toStringTag]() {
        return 0;
    }
};
