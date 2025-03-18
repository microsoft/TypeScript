//// [tests/cases/compiler/circularOptionalityRemoval.ts] ////

//// [circularOptionalityRemoval.ts]
// Constructed repro
function fn1(x: number | undefined = x > 0 ? x : 0) { }

// Report from user
function fn2(x?: string = someCondition ? 'value1' : x) { }

//// [circularOptionalityRemoval.js]
function fn1(x = x > 0 ? x : 0) { }
function fn2(x = someCondition ? 'value1' : x) { }
