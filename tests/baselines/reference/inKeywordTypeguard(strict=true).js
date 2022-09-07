//// [inKeywordTypeguard.ts]
class A { a: string; }
class B { b: string; }

function negativeClassesTest(x: A | B) {
    if ("a" in x) {
        x.b = "1";
    } else {
        x.a = "1";
    }
}

function positiveClassesTest(x: A | B) {
    if ("a" in x) {
        x.b = "1";
    } else {
        x.a = "1";
    }
}

class AWithOptionalProp { a?: string; }
class BWithOptionalProp { b?: string; }

function positiveTestClassesWithOptionalProperties(x: AWithOptionalProp | BWithOptionalProp) {
    if ("a" in x) {
        x.a = "1";
    } else {
        x.b = "1";
    }
}

class AWithMethod {
    a(): string { return ""; }
}

class BWithMethod {
    b(): string { return ""; }
}

function negativeTestClassesWithMembers(x: AWithMethod | BWithMethod) {
    if ("a" in x) {
        x.a();
        x.b();
    } else {
    }
}

function negativeTestClassesWithMemberMissingInBothClasses(x: AWithMethod | BWithMethod) {
    if ("c" in x) {
        x.a();
        x.b();
    } else {
        x.a();
        x.b();
    }
}

class C { a: string; }
class D { a: string; }

function negativeMultipleClassesTest(x: A | B | C | D) {
    if ("a" in x) {
        x.b = "1";
    } else {
        x.a = "1";
    }
}

class ClassWithUnionProp { prop: A | B }

function negativePropTest(x: ClassWithUnionProp) {
    if ("a" in x.prop) {
        let y: string = x.prop.b;
    } else {
        let z: string = x.prop.a;
    }
}

class NegativeClassTest {
    protected prop: A | B;
    inThis() {
        if ("a" in this.prop) {
            let z: number = this.prop.b;
        } else {
            let y: string = this.prop.a;
        }
    }
}

class UnreachableCodeDetection {
    a: string;
    inThis() {
        if ("a" in this) {
        } else {
            let y = this.a;
        }
    }
}

function positiveIntersectionTest(x: { a: string } & { b: string }) {
    if ("a" in x) {
        let s: string = x.a;
    } else {
        let n: never = x;
    }
}

// Repro from #38608
declare const error: Error;
if ('extra' in error) {
    error // Still Error
} else {
    error // Error
}

function narrowsToNever(x: { l: number } | { r: number }) {
    let v: number;
    if ("l" in x) {
        v = x.l;
    }
    else if ("r" in x) {
        v = x.r;
    }
    else {
        v = x
    }
    return v;
}

type AOrB = { aProp: number } | { bProp: number };
declare function isAOrB(x: unknown): x is AOrB;

declare var x: unknown;
if (isAOrB(x)) {
    if ("aProp" in x) {
        x.aProp;
    }
    else if ("bProp" in x) {
        x.bProp;
    }
    // x is never because of the type predicate from unknown
    else if ("cProp" in x) {
        const _never: never = x;
    }
}

function negativeIntersectionTest() {
    if ("ontouchstart" in window) {
        window.ontouchstart
    } else {
        window.ontouchstart
    }
}

function f1(x: unknown) {
    if ("a" in x) {
        x.a;
    }
    if (x && "a" in x) {
        x.a;
    }
    if (x && typeof x === "object" && "a" in x) {
        x.a;
    }
    if (x && typeof x === "object" && "a" in x && "b" in x && "c" in x) {
        x.a;
        x.b;
        x.c;
    }
}

function f2(x: object) {
    if ("a" in x) {
        x.a;
    }
    if ("a" in x && "b" in x && "c" in x) {
        x.a;
        x.b;
        x.c;
    }
}

function f3<T>(x: T) {
    if ("a" in x) {
        x.a;
    }
    if (x && "a" in x) {
        x.a;
    }
    if (x && typeof x === "object" && "a" in x) {
        x.a;
    }
    if (x && typeof x === "object" && "a" in x && "b" in x && "c" in x) {
        x.a;
        x.b;
        x.c;
    }
}

function f4(x: { a: string }) {
    if ("a" in x) {
        x.a;
    }
    if ("a" in x && "b" in x && "c" in x) {
        x.a;
        x.b;
        x.c;
    }
}

function f5(x: { a: string } | { b: string }) {
    if ("a" in x) {
        x;  // { a: string }
    }
    else if ("b" in x) {
        x;  // { b: string }
    }
    else {
        x;  // never
    }
}

function f6(x: { a: string } | { b: string }) {
    if ("a" in x) {
        x;  // { a: string }
    }
    else if ("a" in x) {
        x;  // { b: string } & Record<"a", unknown>
    }
    else {
        x;  // { b: string }
    }
}

// Object and corresponding intersection should narrow the same

function f7(x: { a: string, b: number }, y: { a: string } & { b: number }) {
    if ("a" in x) {
        x;
    }
    else {
        x;  // never
    }
    if ("a" in y) {
        y;
    }
    else {
        y;  // never
    }
}

// Repro from #50639

function f8<A>(value: A) {
    if (typeof value === "object" && value !== null && "prop" in value) {
        value;  // A & object & Record<"prop", unknown>
    }
}


//// [inKeywordTypeguard.js]
"use strict";
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
function negativeClassesTest(x) {
    if ("a" in x) {
        x.b = "1";
    }
    else {
        x.a = "1";
    }
}
function positiveClassesTest(x) {
    if ("a" in x) {
        x.b = "1";
    }
    else {
        x.a = "1";
    }
}
var AWithOptionalProp = /** @class */ (function () {
    function AWithOptionalProp() {
    }
    return AWithOptionalProp;
}());
var BWithOptionalProp = /** @class */ (function () {
    function BWithOptionalProp() {
    }
    return BWithOptionalProp;
}());
function positiveTestClassesWithOptionalProperties(x) {
    if ("a" in x) {
        x.a = "1";
    }
    else {
        x.b = "1";
    }
}
var AWithMethod = /** @class */ (function () {
    function AWithMethod() {
    }
    AWithMethod.prototype.a = function () { return ""; };
    return AWithMethod;
}());
var BWithMethod = /** @class */ (function () {
    function BWithMethod() {
    }
    BWithMethod.prototype.b = function () { return ""; };
    return BWithMethod;
}());
function negativeTestClassesWithMembers(x) {
    if ("a" in x) {
        x.a();
        x.b();
    }
    else {
    }
}
function negativeTestClassesWithMemberMissingInBothClasses(x) {
    if ("c" in x) {
        x.a();
        x.b();
    }
    else {
        x.a();
        x.b();
    }
}
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
function negativeMultipleClassesTest(x) {
    if ("a" in x) {
        x.b = "1";
    }
    else {
        x.a = "1";
    }
}
var ClassWithUnionProp = /** @class */ (function () {
    function ClassWithUnionProp() {
    }
    return ClassWithUnionProp;
}());
function negativePropTest(x) {
    if ("a" in x.prop) {
        var y = x.prop.b;
    }
    else {
        var z = x.prop.a;
    }
}
var NegativeClassTest = /** @class */ (function () {
    function NegativeClassTest() {
    }
    NegativeClassTest.prototype.inThis = function () {
        if ("a" in this.prop) {
            var z = this.prop.b;
        }
        else {
            var y = this.prop.a;
        }
    };
    return NegativeClassTest;
}());
var UnreachableCodeDetection = /** @class */ (function () {
    function UnreachableCodeDetection() {
    }
    UnreachableCodeDetection.prototype.inThis = function () {
        if ("a" in this) {
        }
        else {
            var y = this.a;
        }
    };
    return UnreachableCodeDetection;
}());
function positiveIntersectionTest(x) {
    if ("a" in x) {
        var s = x.a;
    }
    else {
        var n = x;
    }
}
if ('extra' in error) {
    error; // Still Error
}
else {
    error; // Error
}
function narrowsToNever(x) {
    var v;
    if ("l" in x) {
        v = x.l;
    }
    else if ("r" in x) {
        v = x.r;
    }
    else {
        v = x;
    }
    return v;
}
if (isAOrB(x)) {
    if ("aProp" in x) {
        x.aProp;
    }
    else if ("bProp" in x) {
        x.bProp;
    }
    // x is never because of the type predicate from unknown
    else if ("cProp" in x) {
        var _never = x;
    }
}
function negativeIntersectionTest() {
    if ("ontouchstart" in window) {
        window.ontouchstart;
    }
    else {
        window.ontouchstart;
    }
}
function f1(x) {
    if ("a" in x) {
        x.a;
    }
    if (x && "a" in x) {
        x.a;
    }
    if (x && typeof x === "object" && "a" in x) {
        x.a;
    }
    if (x && typeof x === "object" && "a" in x && "b" in x && "c" in x) {
        x.a;
        x.b;
        x.c;
    }
}
function f2(x) {
    if ("a" in x) {
        x.a;
    }
    if ("a" in x && "b" in x && "c" in x) {
        x.a;
        x.b;
        x.c;
    }
}
function f3(x) {
    if ("a" in x) {
        x.a;
    }
    if (x && "a" in x) {
        x.a;
    }
    if (x && typeof x === "object" && "a" in x) {
        x.a;
    }
    if (x && typeof x === "object" && "a" in x && "b" in x && "c" in x) {
        x.a;
        x.b;
        x.c;
    }
}
function f4(x) {
    if ("a" in x) {
        x.a;
    }
    if ("a" in x && "b" in x && "c" in x) {
        x.a;
        x.b;
        x.c;
    }
}
function f5(x) {
    if ("a" in x) {
        x; // { a: string }
    }
    else if ("b" in x) {
        x; // { b: string }
    }
    else {
        x; // never
    }
}
function f6(x) {
    if ("a" in x) {
        x; // { a: string }
    }
    else if ("a" in x) {
        x; // { b: string } & Record<"a", unknown>
    }
    else {
        x; // { b: string }
    }
}
// Object and corresponding intersection should narrow the same
function f7(x, y) {
    if ("a" in x) {
        x;
    }
    else {
        x; // never
    }
    if ("a" in y) {
        y;
    }
    else {
        y; // never
    }
}
// Repro from #50639
function f8(value) {
    if (typeof value === "object" && value !== null && "prop" in value) {
        value; // A & object & Record<"prop", unknown>
    }
}
