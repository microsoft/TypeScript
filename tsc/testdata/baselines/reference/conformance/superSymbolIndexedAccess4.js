//// [tests/cases/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess4.ts] ////

//// [superSymbolIndexedAccess4.ts]
var symbol = Symbol.for('myThing');

class Bar {
    [symbol]() {
        return super[symbol]();
    }
}

//// [superSymbolIndexedAccess4.js]
"use strict";
var symbol = Symbol.for('myThing');
class Bar {
    [symbol]() {
        return super[symbol]();
    }
}
