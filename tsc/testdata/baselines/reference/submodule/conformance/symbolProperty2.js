//// [tests/cases/conformance/es6/Symbols/symbolProperty2.ts] ////

//// [symbolProperty2.ts]
var s = Symbol();
var x = {
    [s]: 0,
    [s]() { },
    get [s]() {
        return 0;
    }
}

//// [symbolProperty2.js]
"use strict";
var s = Symbol();
var x = {
    [s]: 0,
    [s]() { },
    get [s]() {
        return 0;
    }
};
