//// [tests/cases/conformance/types/literal/literalTypes2.ts] ////

//// [literalTypes2.ts]
enum E {
    A, B, C
}

let cond: boolean;

function f1(p1 = 1, p2 = "abc", p3 = true, p4 = E.A) {
    var v1 = 1;
    var v2 = -123;
    var v3 = 3 + 4;
    var v4 = "abc";
    var v5 = "";
    var v6 = "abc" + "def";
    var v7 = true;
    var v8 = E.A;
    let x1 = 1;
    let x2 = -123;
    let x3 = 3 + 4;
    let x4 = "abc";
    let x5 = "";
    let x6 = "abc" + "def";
    let x7 = true;
    var x8 = E.A;
    const c1 = 1;
    const c2 = -123;
    const c3 = 3 + 4;
    const c4 = "abc";
    const c5 = "";
    const c6 = "abc" + "def";
    const c7 = true;
    const c8 = E.A;
}

function f2(p1: 1 = 1, p2: "abc" = "abc", p3: true = true, p4: E.A = E.A) {
    var v1: 1 = 1;
    var v2: -123 = -123;
    var v3: "abc" = "abc";
    var v4: true = true;
    var v5: E.A = E.A;
    let x1: 1 = 1;
    let x2: -123 = -123;
    let x3: "abc" = "abc";
    let x4: true = true;
    let x5: E.A = E.A;
}

function f3() {
    const c1 = cond ? 1 : 2;
    const c2 = cond ? 1 : "two";
    const c3 = cond ? E.A : cond ? true : 123;
    const c4 = cond ? "abc" : null;
    const c5 = cond ? 456 : undefined;
    const c6: { kind: 123 } = { kind: 123 };
    const c7: [1 | 2, "foo" | "bar"] = [1, "bar"];
    const c8 = cond ? c6 : cond ? c7 : "hello";
    let x1 = c1;
    let x2 = c2;
    let x3 = c3;
    let x4 = c4;
    let x5 = c5;
    let x6 = c6;
    let x7 = c7;
    let x8 = c8;
}

class C1 {
    x1 = 1;
    x2 = -123;
    x3 = 3 + 4;
    x4 = "abc";
    x5 = "";
    x6 = "abc" + "def";
    x7 = true;
    x8 = E.A;
    readonly c1 = 1;
    readonly c2 = -123;
    readonly c3 = 3 + 4;
    readonly c4 = "abc";
    readonly c5 = "";
    readonly c6 = "abc" + "def";
    readonly c7 = true;
    readonly c8 = E.A;
}

function f4() {
    const c1 = { a: 1, b: "foo" };
    const c2: { a : 0 | 1, b: "foo" | "bar" } = { a: 1, b: "foo" };
    let x1 = { a: 1, b: "foo" };
    let x2: { a : 0 | 1, b: "foo" | "bar" } = { a: 1, b: "foo" };
}

function f5() {
    const c1 = [1, "foo"];
    const c2: (1 | "foo")[] = [1, "foo"];
    const c3: [1, "foo"] = [1, "foo"];
    let x1 = [1, "foo"];
    let x2: (1 | "foo")[] = [1, "foo"];
    let x3: [1, "foo"] = [1, "foo"];
}

function f6() {
    const { c1 = true, c2 = 0, c3 = "foo" } = { c1: false, c2: 1, c3: "bar" };
    let { x1 = true, x2 = 0, x3 = "foo" } = { x1: false, x2: 1, x3: "bar" };
}

function f10() {
    return "hello";
}

function f11() {
    return cond ? 1 : "two";
}

function f12() {
    if (cond) {
        return 1;
    }
    else {
        return "two";
    }
}

class C2 {
    foo() {
        return 0;
    }
    bar() {
        return cond ? 0 : 1;
    }
}

function f20() {
    const f1 = () => 0;
    const f2 = () => "hello";
    const f3 = () => true;
    const f4 = () => E.C;
    const f5 = (): "foo" => "foo";
    const f6: () => "foo" | "bar" = () => "bar";
    const f7: (() => "foo") | (() => "bar") = () => "bar";
}

declare function g1<T>(x: T): T;
declare function g2<T>(x: T, y: T): T;
declare function g3<T, U>(x: T, y: U): T | U;
declare function g4<T>(x: T): T[];
declare function g5<T extends number>(x: T, y: T): T[];
declare function g6<T>(x: T[]): T;
declare function g7<T>(x: T[]): T[];
declare function g8<T>(x: T, f: (p: T) => T): T;

const a: (1 | 2)[] = [1, 2];

const x1 = g1(1);  // Type 1
const x2 = g2(1, 1);  // Type 1
const x3 = g2(1, 2);  // Type 1 | 2
const x4 = g3(1, "two");  // Type 1 | "two"
const x5 = g4(1);  // Type number[]
const x6 = g5(1, 2);  // Type (1 | 2)[]
const x7 = g6([1, 2]);  // Type number
const x8 = g6(a);  // Type 1 | 2
const x9 = g7(a);  // Type (1 | 2)[]
const x10 = g8(1, x => x);  // Type number
const x11 = g8(1, x => x + 1);  // Type number

function makeArray<T>(x: T): T[] {
    return [x];
}

function append<T>(a: T[], x: T): T[] {
    let result = a.slice();
    result.push(x);
    return result;
}

type Bit = 0 | 1;

let aa = makeArray<Bit>(0);
aa = append(aa, 1);


//// [literalTypes2.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
})(E || (E = {}));
var cond;
function f1(p1, p2, p3, p4) {
    if (p1 === void 0) { p1 = 1; }
    if (p2 === void 0) { p2 = "abc"; }
    if (p3 === void 0) { p3 = true; }
    if (p4 === void 0) { p4 = E.A; }
    var v1 = 1;
    var v2 = -123;
    var v3 = 3 + 4;
    var v4 = "abc";
    var v5 = "";
    var v6 = "abc" + "def";
    var v7 = true;
    var v8 = E.A;
    var x1 = 1;
    var x2 = -123;
    var x3 = 3 + 4;
    var x4 = "abc";
    var x5 = "";
    var x6 = "abc" + "def";
    var x7 = true;
    var x8 = E.A;
    var c1 = 1;
    var c2 = -123;
    var c3 = 3 + 4;
    var c4 = "abc";
    var c5 = "";
    var c6 = "abc" + "def";
    var c7 = true;
    var c8 = E.A;
}
function f2(p1, p2, p3, p4) {
    if (p1 === void 0) { p1 = 1; }
    if (p2 === void 0) { p2 = "abc"; }
    if (p3 === void 0) { p3 = true; }
    if (p4 === void 0) { p4 = E.A; }
    var v1 = 1;
    var v2 = -123;
    var v3 = "abc";
    var v4 = true;
    var v5 = E.A;
    var x1 = 1;
    var x2 = -123;
    var x3 = "abc";
    var x4 = true;
    var x5 = E.A;
}
function f3() {
    var c1 = cond ? 1 : 2;
    var c2 = cond ? 1 : "two";
    var c3 = cond ? E.A : cond ? true : 123;
    var c4 = cond ? "abc" : null;
    var c5 = cond ? 456 : undefined;
    var c6 = { kind: 123 };
    var c7 = [1, "bar"];
    var c8 = cond ? c6 : cond ? c7 : "hello";
    var x1 = c1;
    var x2 = c2;
    var x3 = c3;
    var x4 = c4;
    var x5 = c5;
    var x6 = c6;
    var x7 = c7;
    var x8 = c8;
}
var C1 = /** @class */ (function () {
    function C1() {
        this.x1 = 1;
        this.x2 = -123;
        this.x3 = 3 + 4;
        this.x4 = "abc";
        this.x5 = "";
        this.x6 = "abc" + "def";
        this.x7 = true;
        this.x8 = E.A;
        this.c1 = 1;
        this.c2 = -123;
        this.c3 = 3 + 4;
        this.c4 = "abc";
        this.c5 = "";
        this.c6 = "abc" + "def";
        this.c7 = true;
        this.c8 = E.A;
    }
    return C1;
}());
function f4() {
    var c1 = { a: 1, b: "foo" };
    var c2 = { a: 1, b: "foo" };
    var x1 = { a: 1, b: "foo" };
    var x2 = { a: 1, b: "foo" };
}
function f5() {
    var c1 = [1, "foo"];
    var c2 = [1, "foo"];
    var c3 = [1, "foo"];
    var x1 = [1, "foo"];
    var x2 = [1, "foo"];
    var x3 = [1, "foo"];
}
function f6() {
    var _a = { c1: false, c2: 1, c3: "bar" }, _b = _a.c1, c1 = _b === void 0 ? true : _b, _c = _a.c2, c2 = _c === void 0 ? 0 : _c, _d = _a.c3, c3 = _d === void 0 ? "foo" : _d;
    var _e = { x1: false, x2: 1, x3: "bar" }, _f = _e.x1, x1 = _f === void 0 ? true : _f, _g = _e.x2, x2 = _g === void 0 ? 0 : _g, _h = _e.x3, x3 = _h === void 0 ? "foo" : _h;
}
function f10() {
    return "hello";
}
function f11() {
    return cond ? 1 : "two";
}
function f12() {
    if (cond) {
        return 1;
    }
    else {
        return "two";
    }
}
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.foo = function () {
        return 0;
    };
    C2.prototype.bar = function () {
        return cond ? 0 : 1;
    };
    return C2;
}());
function f20() {
    var f1 = function () { return 0; };
    var f2 = function () { return "hello"; };
    var f3 = function () { return true; };
    var f4 = function () { return E.C; };
    var f5 = function () { return "foo"; };
    var f6 = function () { return "bar"; };
    var f7 = function () { return "bar"; };
}
var a = [1, 2];
var x1 = g1(1); // Type 1
var x2 = g2(1, 1); // Type 1
var x3 = g2(1, 2); // Type 1 | 2
var x4 = g3(1, "two"); // Type 1 | "two"
var x5 = g4(1); // Type number[]
var x6 = g5(1, 2); // Type (1 | 2)[]
var x7 = g6([1, 2]); // Type number
var x8 = g6(a); // Type 1 | 2
var x9 = g7(a); // Type (1 | 2)[]
var x10 = g8(1, function (x) { return x; }); // Type number
var x11 = g8(1, function (x) { return x + 1; }); // Type number
function makeArray(x) {
    return [x];
}
function append(a, x) {
    var result = a.slice();
    result.push(x);
    return result;
}
var aa = makeArray(0);
aa = append(aa, 1);
