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
var x = undefined;
var y = undefined;
if (x === "") {
    var a = x;
}
if (x !== "") {
    var b = x;
}
if (x == "") {
    var c = x;
}
if (x != "") {
    var d = x;
}
if (x) {
    var e = x;
}
if (!x) {
    var f = x;
}
if (!!x) {
    var g = x;
}
if (!!!x) {
    var h = x;
}


//// [stringLiteralTypesInUnionTypes04.d.ts]
type T = "" | "foo";
declare let x: T;
declare let y: T;
