//// [tests/cases/conformance/types/literal/literalTypesAndTypeAssertions.ts] ////

//// [literalTypesAndTypeAssertions.ts]
const obj = {
    a: "foo" as "foo",
    b: <"foo">"foo",
    c: "foo"
};

let x1 = 1 as (0 | 1);
let x2 = 1;

let { a = "foo" } = { a: "foo" };
let { b = "foo" as "foo" } = { b: "bar" };
let { c = "foo" } = { c: "bar" as "bar" };
let { d = "foo" as "foo" } = { d: "bar" as "bar" };


//// [literalTypesAndTypeAssertions.js]
var obj = {
    a: "foo",
    b: "foo",
    c: "foo"
};
var x1 = 1;
var x2 = 1;
var _a = { a: "foo" }.a, a = _a === void 0 ? "foo" : _a;
var _b = { b: "bar" }.b, b = _b === void 0 ? "foo" : _b;
var _c = { c: "bar" }.c, c = _c === void 0 ? "foo" : _c;
var _d = { d: "bar" }.d, d = _d === void 0 ? "foo" : _d;
