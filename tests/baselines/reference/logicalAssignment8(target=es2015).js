//// [tests/cases/conformance/es2021/logicalAssignment/logicalAssignment8.ts] ////

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
    var _a;
    (results || (results = (_a = bar === null || bar === void 0 ? void 0 : bar.value) !== null && _a !== void 0 ? _a : [])).push(100);
}
function foo2(results) {
    var _a;
    (results !== null && results !== void 0 ? results : (results = (_a = bar === null || bar === void 0 ? void 0 : bar.value) !== null && _a !== void 0 ? _a : [])).push(100);
}
function foo3(results) {
    var _a;
    (results && (results = (_a = bar === null || bar === void 0 ? void 0 : bar.value) !== null && _a !== void 0 ? _a : [])).push(100);
}
