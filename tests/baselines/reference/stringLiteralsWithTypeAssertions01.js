//// [tests/cases/conformance/types/literal/stringLiteralsWithTypeAssertions01.ts] ////

//// [stringLiteralsWithTypeAssertions01.ts]
let fooOrBar: "foo" | "bar";

let a = "foo" as "bar";
let b = "bar" as "foo";
let c = fooOrBar as "foo";
let d = fooOrBar as "bar";
let e = fooOrBar as "baz";
let f = "baz" as typeof fooOrBar;

//// [stringLiteralsWithTypeAssertions01.js]
let fooOrBar;
let a = "foo";
let b = "bar";
let c = fooOrBar;
let d = fooOrBar;
let e = fooOrBar;
let f = "baz";
