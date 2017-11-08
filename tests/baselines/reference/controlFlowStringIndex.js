//// [controlFlowStringIndex.ts]
type A = { [index: string]: number | null };
declare const value: A;
if (value.foo !== null) {
    value.foo.toExponential()
}


//// [controlFlowStringIndex.js]
"use strict";
if (value.foo !== null) {
    value.foo.toExponential();
}
