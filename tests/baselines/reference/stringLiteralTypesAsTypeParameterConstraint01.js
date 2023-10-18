//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesAsTypeParameterConstraint01.ts] ////

//// [stringLiteralTypesAsTypeParameterConstraint01.ts]
function foo<T extends "foo">(f: (x: T) => T) {
    return f;
}

function bar<T extends "foo" | "bar">(f: (x: T) => T) {
    return f;
}

let f = foo(x => x);
let fResult = f("foo");

let g = foo((x => x));
let gResult = g("foo");

let h = bar(x => x);
let hResult = h("foo");
hResult = h("bar");

//// [stringLiteralTypesAsTypeParameterConstraint01.js]
function foo(f) {
    return f;
}
function bar(f) {
    return f;
}
var f = foo(function (x) { return x; });
var fResult = f("foo");
var g = foo((function (x) { return x; }));
var gResult = g("foo");
var h = bar(function (x) { return x; });
var hResult = h("foo");
hResult = h("bar");


//// [stringLiteralTypesAsTypeParameterConstraint01.d.ts]
declare function foo<T extends "foo">(f: (x: T) => T): (x: T) => T;
declare function bar<T extends "foo" | "bar">(f: (x: T) => T): (x: T) => T;
declare let f: (x: "foo") => "foo";
declare let fResult: "foo";
declare let g: (x: "foo") => "foo";
declare let gResult: "foo";
declare let h: (x: "foo" | "bar") => "foo" | "bar";
declare let hResult: "foo" | "bar";
