//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesAndLogicalOrExpressions01.ts] ////

//// [stringLiteralTypesAndLogicalOrExpressions01.ts]
declare function myRandBool(): boolean;

let a: "foo" = "foo";
let b = a || "foo";
let c: "foo" = b;
let d = b || "bar";
let e: "foo" | "bar" = d;


//// [stringLiteralTypesAndLogicalOrExpressions01.js]
let a = "foo";
let b = a || "foo";
let c = b;
let d = b || "bar";
let e = d;


//// [stringLiteralTypesAndLogicalOrExpressions01.d.ts]
declare function myRandBool(): boolean;
declare let a: "foo";
declare let b: "foo";
declare let c: "foo";
declare let d: string;
declare let e: "foo" | "bar";
