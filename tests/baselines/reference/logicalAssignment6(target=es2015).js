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
    (results || (results = results1 || (results1 = []))).push(100);
}
function foo2(results, results1) {
    (results !== null && results !== void 0 ? results : (results = results1 !== null && results1 !== void 0 ? results1 : (results1 = []))).push(100);
}
function foo3(results, results1) {
    (results && (results = results1 && (results1 = []))).push(100);
}
