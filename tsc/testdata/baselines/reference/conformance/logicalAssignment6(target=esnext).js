//// [tests/cases/conformance/es2021/logicalAssignment/logicalAssignment6.ts] ////

//// [logicalAssignment6.ts]
function foo1(results: number[] | undefined, results1: number[] | undefined) {
    (results ||= (results1 ||= [])).push(100);
}

function foo2(results: number[] | undefined, results1: number[] | undefined) {
    (results ??= (results1 ??= [])).push(100);
}

function foo3(results: number[] | undefined, results1: number[] | undefined) {
    (results &&= (results1 &&= [])).push(100);
}


//// [logicalAssignment6.js]
"use strict";
function foo1(results, results1) {
    (results ||= (results1 ||= [])).push(100);
}
function foo2(results, results1) {
    (results ??= (results1 ??= [])).push(100);
}
function foo3(results, results1) {
    (results &&= (results1 &&= [])).push(100);
}
