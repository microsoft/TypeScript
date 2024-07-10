//// [tests/cases/compiler/normalizedPropToRecord.ts] ////

//// [normalizedPropToRecord.ts]
type Foo = {
    stuff: Record<string, number>;
};
function getFoo() {
    if (Math.random() > 0.5) {
        return { stuff: { a: 42 } };
    } else {
        return { stuff: { b: 99 } };
    }
}

// Actually fine, but claimed not to be
const p: Foo = getFoo();

//// [normalizedPropToRecord.js]
"use strict";
function getFoo() {
    if (Math.random() > 0.5) {
        return { stuff: { a: 42 } };
    }
    else {
        return { stuff: { b: 99 } };
    }
}
// Actually fine, but claimed not to be
var p = getFoo();
