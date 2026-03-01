//// [tests/cases/conformance/es6/Symbols/symbolProperty45.ts] ////

//// [symbolProperty45.ts]
class C {
    get [Symbol.hasInstance]() {
        return "";
    }
    get [Symbol.toPrimitive]() {
        return "";
    }
}

//// [symbolProperty45.js]
"use strict";
class C {
    get [Symbol.hasInstance]() {
        return "";
    }
    get [Symbol.toPrimitive]() {
        return "";
    }
}
