//// [logicalAssignment4.ts]
function foo1(results: number[] | undefined) {
    (results ||= []).push(100);
}

function foo2(results: number[] | undefined) {
    (results ??= []).push(100);
}

//// [logicalAssignment4.js]
"use strict";
function foo1(results) {
    (results ||= []).push(100);
}
function foo2(results) {
    (results ??= []).push(100);
}
