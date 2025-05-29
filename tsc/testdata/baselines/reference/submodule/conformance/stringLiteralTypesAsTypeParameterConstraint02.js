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
let f = foo((y) => y === "foo" ? y : "foo");
let fResult = f("foo");


//// [stringLiteralTypesAsTypeParameterConstraint02.d.ts]
declare function foo<T extends "foo">(f: (x: T) => T): (x: T) => T;
declare let f: (x: "foo") => "foo";
declare let fResult: "foo";
