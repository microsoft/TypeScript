//// [tests/cases/conformance/types/literal/stringLiteralsWithTypeAssertions01.ts] ////

//// [stringLiteralsWithTypeAssertions01.ts]
let fooOrBar: "foo" | "bar";

let a = "foo" as "bar";
let b = "bar" as "foo";
let c = fooOrBar as "foo";
let d = fooOrBar as "bar";
let e = fooOrBar as "baz";
let f = "baz" as typeof fooOrBar;

/// [Declarations] ////



//// [stringLiteralsWithTypeAssertions01.d.ts]
declare let fooOrBar: "foo" | "bar";
declare let a: "bar";
declare let b: "foo";
declare let c: "foo";
declare let d: "bar";
declare let e: "baz";
declare let f: "foo" | "bar";
