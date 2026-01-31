//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesAndParenthesizedExpressions01.ts] ////

//// [stringLiteralTypesAndParenthesizedExpressions01.ts]
declare function myRandBool(): boolean;

let a: "foo" = ("foo");
let b: "foo" | "bar" = ("foo");
let c: "foo" = (myRandBool ? "foo" : ("foo"));
let d: "foo" | "bar" = (myRandBool ? "foo" : ("bar"));


//// [stringLiteralTypesAndParenthesizedExpressions01.js]
let a = ("foo");
let b = ("foo");
let c = (myRandBool ? "foo" : ("foo"));
let d = (myRandBool ? "foo" : ("bar"));


//// [stringLiteralTypesAndParenthesizedExpressions01.d.ts]
declare function myRandBool(): boolean;
declare let a: "foo";
declare let b: "foo" | "bar";
declare let c: "foo";
declare let d: "foo" | "bar";
