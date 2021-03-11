//// [logicalAssignment7.ts]
function foo1(results: number[] | undefined, results1: number[] | undefined) {
    (results ||= results1 ||= []).push(100);
}

function foo2(results: number[] | undefined, results1: number[] | undefined) {
    (results ??= results1 ??= []).push(100);
}

function foo3(results: number[] | undefined, results1: number[] | undefined) {
    (results &&= results1 &&= []).push(100);
}


//// [logicalAssignment7.js]
"use strict";
function foo1(results, results1) {
    (results || (results = results1 || (results1 = []))).push(100);
}
function foo2(results, results1) {
    (results ?? (results = results1 ?? (results1 = []))).push(100);
}
function foo3(results, results1) {
    (results && (results = results1 && (results1 = []))).push(100);
}
