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
var a = "";
var b = "foo";
var c = "bar";
var d = "baz";
a = "";
b = "foo";
c = "bar";
var e = "" = "";
var f = "foo" = "foo";
var g = "bar" = "bar";
var h = "baz" = "baz";
e = "";
f = "foo";
g = "bar";
