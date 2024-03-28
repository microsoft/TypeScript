//// [tests/cases/conformance/types/literal/literalTypeWidening.ts] ////

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

declare function widening<T>(x: T): T;
declare function nonWidening<T extends string | number | symbol>(x: T): T;

function f6(cond: boolean) {
    let x1 = widening('a');
    let x2 = widening(10);
    let x3 = widening(cond ? 'a' : 10);
    let y1 = nonWidening('a');
    let y2 = nonWidening(10);
    let y3 = nonWidening(cond ? 'a' : 10);
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

// Repro from #23649

export function Set<K extends string>(...keys: K[]): Record<K, true | undefined> {
  const result = {} as Record<K, true | undefined>
  keys.forEach(key => result[key] = true)
  return result
}

export function keys<K extends string, V>(obj: Record<K, V>): K[] {
  return Object.keys(obj) as K[]
}

type Obj = { code: LangCode }

const langCodeSet = Set('fr', 'en', 'es', 'it', 'nl')
export type LangCode = keyof typeof langCodeSet
export const langCodes = keys(langCodeSet)

const arr: Obj[] = langCodes.map(code => ({ code }))

// Repro from #29081

function test<T extends { a: string, b: string }>(obj: T): T {
    let { a, ...rest } = obj;
    return { a: 'hello', ...rest } as T;
}

// Repro from #32169

declare function f<T>(x: T): NonNullable<T>;
enum E { A, B }
const a = f(E.A);
const b: E.A = a;


//// [literalTypeWidening.js]
"use strict";
// Widening vs. non-widening literal types
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.langCodes = void 0;
exports.Set = Set;
exports.keys = keys;
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
function f6(cond) {
    var x1 = widening('a');
    var x2 = widening(10);
    var x3 = widening(cond ? 'a' : 10);
    var y1 = nonWidening('a');
    var y2 = nonWidening(10);
    var y3 = nonWidening(cond ? 'a' : 10);
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
// Repro from #23649
function Set() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    var result = {};
    keys.forEach(function (key) { return result[key] = true; });
    return result;
}
function keys(obj) {
    return Object.keys(obj);
}
var langCodeSet = Set('fr', 'en', 'es', 'it', 'nl');
exports.langCodes = keys(langCodeSet);
var arr = exports.langCodes.map(function (code) { return ({ code: code }); });
// Repro from #29081
function test(obj) {
    var a = obj.a, rest = __rest(obj, ["a"]);
    return __assign({ a: 'hello' }, rest);
}
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));
var a = f(E.A);
var b = a;
