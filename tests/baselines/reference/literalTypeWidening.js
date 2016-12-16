//// [literalTypeWidening.ts]
// Widening vs. non-widening literal types

function f1() {
    const c1 = "hello";  // Widening type "hello"
    let v1 = c1;  // Type string
    const c2 = c1;  // Widening type "hello"
    let v2 = c2;  // Type string
    const c3: "hello" = "hello";  // Type "hello"
    let v3 = c3;  // Type "hello"
    const c4: "hello" = c1;  // Type "hello"
    let v4 = c4;  // Type "hello"
}

function f2(cond: boolean) {
    const c1 = cond ? "foo" : "bar";  // widening "foo" | widening "bar"
    const c2: "foo" | "bar" = c1;  // "foo" | "bar"
    const c3 = cond ? c1 : c2;  // "foo" | "bar"
    const c4 = cond ? c3 : "baz";  // "foo" | "bar" | widening "baz"
    const c5: "foo" | "bar" | "baz" = c4; // "foo" | "bar" | "baz"
    let v1 = c1;  // string
    let v2 = c2;  // "foo" | "bar"
    let v3 = c3;  // "foo" | "bar"
    let v4 = c4;  // string
    let v5 = c5;  // "foo" | "bar" | "baz"
}

function f3() {
    const c1 = 123;  // Widening type 123
    let v1 = c1;  // Type number
    const c2 = c1;  // Widening type 123
    let v2 = c2;  // Type number
    const c3: 123 = 123;  // Type 123
    let v3 = c3;  // Type 123
    const c4: 123 = c1;  // Type 123
    let v4 = c4;  // Type 123
}

function f4(cond: boolean) {
    const c1 = cond ? 123 : 456;  // widening 123 | widening 456
    const c2: 123 | 456 = c1;  // 123 | 456
    const c3 = cond ? c1 : c2;  // 123 | 456
    const c4 = cond ? c3 : 789;  // 123 | 456 | widening 789
    const c5: 123 | 456 | 789 = c4; // 123 | 456 | 789
    let v1 = c1;  // number
    let v2 = c2;  // 123 | 456
    let v3 = c3;  // 123 | 456
    let v4 = c4;  // number
    let v5 = c5;  // 123 | 456 | 789
}

function f5() {
    const c1 = "foo";
    let v1 = c1;
    const c2: "foo" = "foo";
    let v2 = c2;
    const c3 = "foo" as "foo";
    let v3 = c3;
    const c4 = <"foo">"foo";
    let v4 = c4;
}

// Repro from #10898

type FAILURE = "FAILURE";
const FAILURE = "FAILURE";

type Result<T> = T | FAILURE;

function doWork<T>(): Result<T> {
  return FAILURE;
}

function isSuccess<T>(result: Result<T>): result is T {
  return !isFailure(result);
}

function isFailure<T>(result: Result<T>): result is FAILURE {
  return result === FAILURE;
}

function increment(x: number): number {
  return x + 1;
}

let result = doWork<number>();

if (isSuccess(result)) {
  increment(result);
}

// Repro from #10898

type TestEvent = "onmouseover" | "onmouseout";

function onMouseOver(): TestEvent { return "onmouseover"; }

let x = onMouseOver();

//// [literalTypeWidening.js]
// Widening vs. non-widening literal types
function f1() {
    var c1 = "hello"; // Widening type "hello"
    var v1 = c1; // Type string
    var c2 = c1; // Widening type "hello"
    var v2 = c2; // Type string
    var c3 = "hello"; // Type "hello"
    var v3 = c3; // Type "hello"
    var c4 = c1; // Type "hello"
    var v4 = c4; // Type "hello"
}
function f2(cond) {
    var c1 = cond ? "foo" : "bar"; // widening "foo" | widening "bar"
    var c2 = c1; // "foo" | "bar"
    var c3 = cond ? c1 : c2; // "foo" | "bar"
    var c4 = cond ? c3 : "baz"; // "foo" | "bar" | widening "baz"
    var c5 = c4; // "foo" | "bar" | "baz"
    var v1 = c1; // string
    var v2 = c2; // "foo" | "bar"
    var v3 = c3; // "foo" | "bar"
    var v4 = c4; // string
    var v5 = c5; // "foo" | "bar" | "baz"
}
function f3() {
    var c1 = 123; // Widening type 123
    var v1 = c1; // Type number
    var c2 = c1; // Widening type 123
    var v2 = c2; // Type number
    var c3 = 123; // Type 123
    var v3 = c3; // Type 123
    var c4 = c1; // Type 123
    var v4 = c4; // Type 123
}
function f4(cond) {
    var c1 = cond ? 123 : 456; // widening 123 | widening 456
    var c2 = c1; // 123 | 456
    var c3 = cond ? c1 : c2; // 123 | 456
    var c4 = cond ? c3 : 789; // 123 | 456 | widening 789
    var c5 = c4; // 123 | 456 | 789
    var v1 = c1; // number
    var v2 = c2; // 123 | 456
    var v3 = c3; // 123 | 456
    var v4 = c4; // number
    var v5 = c5; // 123 | 456 | 789
}
function f5() {
    var c1 = "foo";
    var v1 = c1;
    var c2 = "foo";
    var v2 = c2;
    var c3 = "foo";
    var v3 = c3;
    var c4 = "foo";
    var v4 = c4;
}
var FAILURE = "FAILURE";
function doWork() {
    return FAILURE;
}
function isSuccess(result) {
    return !isFailure(result);
}
function isFailure(result) {
    return result === FAILURE;
}
function increment(x) {
    return x + 1;
}
var result = doWork();
if (isSuccess(result)) {
    increment(result);
}
function onMouseOver() { return "onmouseover"; }
var x = onMouseOver();
