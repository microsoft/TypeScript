//// [tests/cases/compiler/reachabilityChecksIgnored.ts] ////

//// [reachabilityChecksIgnored.ts]
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

//// [reachabilityChecksIgnored.js]
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
