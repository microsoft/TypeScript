//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesInUnionTypes04.ts] ////

//// [stringLiteralTypesInUnionTypes04.ts]
type T = "" | "foo";

let x: T = undefined;
let y: T = undefined;

if (x === "") {
    let a = x;
}

if (x !== "") {
    let b = x;
}

if (x == "") {
    let c = x;
}

if (x != "") {
    let d = x;
}

if (x) {
    let e = x;
}

if (!x) {
    let f = x;
}

if (!!x) {
    let g = x;
}

if (!!!x) {
    let h = x;
}

//// [stringLiteralTypesInUnionTypes04.js]
let x = undefined;
let y = undefined;
if (x === "") {
    let a = x;
}
if (x !== "") {
    let b = x;
}
if (x == "") {
    let c = x;
}
if (x != "") {
    let d = x;
}
if (x) {
    let e = x;
}
if (!x) {
    let f = x;
}
if (!!x) {
    let g = x;
}
if (!!!x) {
    let h = x;
}
