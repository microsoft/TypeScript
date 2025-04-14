//// [tests/cases/compiler/evolvingArrayTypeInAssert.ts] ////

//// [evolvingArrayTypeInAssert.ts]
export function unsafeCast<T>(_value: unknown): asserts _value is T { }

function yadda() {
    let out = [];
    out.push(100)
    unsafeCast<any>(out);
    return out;
}


//// [evolvingArrayTypeInAssert.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsafeCast = unsafeCast;
function unsafeCast(_value) { }
function yadda() {
    var out = [];
    out.push(100);
    unsafeCast(out);
    return out;
}
