//// [tests/cases/compiler/unionSignaturesWithThisParameter.ts] ////

//// [unionSignaturesWithThisParameter.ts]
// Repro from #20802

function x<T>(ctor: {
    (this: {}, v: T): void;
    new(v: T): void;
} | {
    (v: T): void;
    new(v: T): void;
}, t: T) {
    new ctor(t);
}


//// [unionSignaturesWithThisParameter.js]
"use strict";
// Repro from #20802
function x(ctor, t) {
    new ctor(t);
}
