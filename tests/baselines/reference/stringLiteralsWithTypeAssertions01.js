//// [stringLiteralsWithTypeAssertions01.ts]
let fooOrBar: "foo" | "bar";

let a = "foo" as "bar";
let b = "bar" as "foo";
let c = fooOrBar as "foo";
let d = fooOrBar as "bar";
let e = fooOrBar as "baz";
let f = "baz" as typeof fooOrBar;

//// [stringLiteralsWithTypeAssertions01.js]
var fooOrBar;
var a = "foo";
var b = "bar";
var c = fooOrBar;
var d = fooOrBar;
var e = fooOrBar;
var f = "baz";
