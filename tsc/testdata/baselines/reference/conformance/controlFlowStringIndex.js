//// [tests/cases/conformance/controlFlow/controlFlowStringIndex.ts] ////

//// [controlFlowStringIndex.ts]
type A = {
    other: number | null;
    [index: string]: number | null
};
declare const value: A;
if (value.foo !== null) {
    value.foo.toExponential()
    value.other // should still be number | null
    value.bar // should still be number | null
}


//// [controlFlowStringIndex.js]
"use strict";
if (value.foo !== null) {
    value.foo.toExponential();
    value.other; // should still be number | null
    value.bar; // should still be number | null
}
