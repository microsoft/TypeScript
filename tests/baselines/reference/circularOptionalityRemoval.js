//// [circularOptionalityRemoval.ts]
// Constructed repro
function fn1(x: number | undefined = x > 0 ? x : 0) { }

// Report from user
function fn2(x?: string = someCondition ? 'value1' : x) { }

//// [circularOptionalityRemoval.js]
// Constructed repro
function fn1(x) {
    if (x === void 0) { x = x > 0 ? x : 0; }
}
// Report from user
function fn2(x) {
    if (x === void 0) { x = someCondition ? 'value1' : x; }
}
