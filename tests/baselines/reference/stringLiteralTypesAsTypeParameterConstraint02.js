//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesAsTypeParameterConstraint02.ts] ////

//// [stringLiteralTypesAsTypeParameterConstraint02.ts]
function foo<T extends "foo">(f: (x: T) => T) {
    return f;
}

let f = foo((y: "foo" | "bar") => y === "foo" ? y : "foo");
let fResult = f("foo");

//// [stringLiteralTypesAsTypeParameterConstraint02.js]
function foo(f) {
    return f;
}
var f = foo(function (y) { return y === "foo" ? y : "foo"; });
var fResult = f("foo");


//// [stringLiteralTypesAsTypeParameterConstraint02.d.ts]
declare function foo<T extends "foo">(f: (x: T) => T): (x: T) => T;
declare let f: (x: "foo") => "foo";
declare let fResult: "foo";
