//// [tests/cases/conformance/types/spread/spreadOverwritesProperty.ts] ////

//// [spreadOverwritesProperty.ts]
// without strict null checks, none of these should be an error
declare var ab: { a: number, b: number };
declare var abq: { a: number, b?: number };
var unused1 = { b: 1, ...ab }
var unused2 = { ...ab, ...ab }
var unused3 = { b: 1, ...abq }

function g(obj: { x: number | undefined }) {
    return { x: 1, ...obj };
}
function h(obj: { x: number }) {
    return { x: 1, ...obj };
}


//// [spreadOverwritesProperty.js]
var unused1 = { b: 1, ...ab };
var unused2 = { ...ab, ...ab };
var unused3 = { b: 1, ...abq };
function g(obj) {
    return { x: 1, ...obj };
}
function h(obj) {
    return { x: 1, ...obj };
}
