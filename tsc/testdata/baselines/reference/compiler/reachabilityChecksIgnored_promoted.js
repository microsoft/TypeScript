//// [tests/cases/compiler/reachabilityChecksIgnored_promoted.ts] ////

//// [reachabilityChecksIgnored_promoted.ts]
function a() {
    throw new Error("");

    // @ts-ignore
    console.log("unreachable");
}

function b() {
    throw new Error("");

    // @ts-expect-error
    console.log("unreachable");
}

//// [reachabilityChecksIgnored_promoted.js]
"use strict";
function a() {
    throw new Error("");
    // @ts-ignore
    console.log("unreachable");
}
function b() {
    throw new Error("");
    // @ts-expect-error
    console.log("unreachable");
}
