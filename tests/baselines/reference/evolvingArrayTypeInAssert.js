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
exports.__esModule = true;
exports.unsafeCast = void 0;
function unsafeCast(_value) { }
exports.unsafeCast = unsafeCast;
function yadda() {
    var out = [];
    out.push(100);
    unsafeCast(out);
    return out;
}
