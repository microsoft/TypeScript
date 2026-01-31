//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesInVariableDeclarations01.ts] ////

//// [stringLiteralTypesInVariableDeclarations01.ts]
let a: "";
var b: "foo";
let c: "bar";
const d: "baz";

a = "";
b = "foo";
c = "bar";

let e: "" = "";
var f: "foo" = "foo";
let g: "bar" = "bar";
const h: "baz" = "baz";

e = "";
f = "foo";
g = "bar";

//// [stringLiteralTypesInVariableDeclarations01.js]
let a;
var b;
let c;
const d;
a = "";
b = "foo";
c = "bar";
let e = "";
var f = "foo";
let g = "bar";
const h = "baz";
e = "";
f = "foo";
g = "bar";


//// [stringLiteralTypesInVariableDeclarations01.d.ts]
declare let a: "";
declare var b: "foo";
declare let c: "bar";
declare const d: "baz";
declare let e: "";
declare var f: "foo";
declare let g: "bar";
declare const h: "baz";
