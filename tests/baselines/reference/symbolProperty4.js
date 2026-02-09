//// [tests/cases/conformance/es6/Symbols/symbolProperty4.ts] ////

//// [symbolProperty4.ts]
var x = {
    [Symbol()]: 0,
    [Symbol()]() { },
    get [Symbol()]() {
        return 0;
    }
}

//// [symbolProperty4.js]
"use strict";
var x = {
    [Symbol()]: 0,
    [Symbol()]() { },
    get [Symbol()]() {
        return 0;
    }
};
