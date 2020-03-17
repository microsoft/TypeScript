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
declare function foo<T extends "foo">(f: (x: T) => T): (x: T_1) => T_1;
declare let f: (x: "foo") => "foo";
declare let fResult: "foo";


//// [DtsFileErrors]


tests/cases/conformance/types/stringLiteral/stringLiteralTypesAsTypeParameterConstraint02.d.ts(1,60): error TS2304: Cannot find name 'T_1'.
tests/cases/conformance/types/stringLiteral/stringLiteralTypesAsTypeParameterConstraint02.d.ts(1,68): error TS2304: Cannot find name 'T_1'.


==== tests/cases/conformance/types/stringLiteral/stringLiteralTypesAsTypeParameterConstraint02.d.ts (2 errors) ====
    declare function foo<T extends "foo">(f: (x: T) => T): (x: T_1) => T_1;
                                                               ~~~
!!! error TS2304: Cannot find name 'T_1'.
                                                                       ~~~
!!! error TS2304: Cannot find name 'T_1'.
    declare let f: (x: "foo") => "foo";
    declare let fResult: "foo";
    