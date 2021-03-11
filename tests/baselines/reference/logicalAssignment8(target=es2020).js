//// [logicalAssignment8.ts]
declare const bar: { value?: number[] } | undefined

function foo1(results: number[] | undefined) {
    (results ||= bar?.value ?? []).push(100);
}

function foo2(results: number[] | undefined) {
    (results ??= bar?.value ?? []).push(100);
}

function foo3(results: number[] | undefined) {
    (results &&= bar?.value ?? []).push(100);
}


//// [logicalAssignment8.js]
"use strict";
function foo1(results) {
    (results || (results = bar?.value ?? [])).push(100);
}
function foo2(results) {
    (results ?? (results = bar?.value ?? [])).push(100);
}
function foo3(results) {
    (results && (results = bar?.value ?? [])).push(100);
}
