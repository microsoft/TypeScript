//// [tests/cases/compiler/es5-asyncFunction.ts] ////

//// [es5-asyncFunction.ts]
declare var x;

async function empty() {
}

async function singleAwait() {
    await x;
}

//// [es5-asyncFunction.js]
"use strict";
async function empty() {
}
async function singleAwait() {
    await x;
}
