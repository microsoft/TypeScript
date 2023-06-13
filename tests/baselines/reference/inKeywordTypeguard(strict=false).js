//// [tests/cases/compiler/inKeywordTypeguard.ts] ////

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

const sym = Symbol();

function f8(x: object) {
    if ("a" in x && 1 in x && sym in x) {
        x.a;
        x["a"];
        x[1];
        x["1"];
        x[sym];
    }
}

function f9(x: object) {
    if ("a" in x && "1" in x && sym in x) {
        x.a;
        x["a"];
        x[1];
        x["1"];
        x[sym];
    }
}

function f10(x: { a: unknown }) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}

function f11(x: { a: any }) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}

function f12(x: { a: string }) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}

function f13(x: { a?: string }) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}

function f14(x: { a: string | undefined }) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}

function f15(x: { a?: string | undefined }) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}

function f16(x: typeof globalThis, y: Window & typeof globalThis) {
    x = y;
}

// Repro from #50639

function foo<A>(value: A) {
    if (typeof value === "object" && value !== null && "prop" in value) {
        value;  // A & object & Record<"prop", unknown>
    }
}

// Repro from #50954

const checkIsTouchDevice = () =>
    "ontouchstart" in window || "msMaxTouchPoints" in window.navigator;

// Repro from #51501

function isHTMLTable<T extends object | null>(table: T): boolean {
    return !!table && 'html' in table;
}

// Repro from #51549

const f = <P extends object>(a: P & {}) => {
    "foo" in a;
};

// Repro from #53773

function test1<T extends any[] | Record<string, any>>(obj: T) {
    if (Array.isArray(obj) || 'length' in obj) {
      obj;  // T
    }
    else {
      obj;  // T
    }
}

function test2<T extends any[] | Record<string, any>>(obj: T) {
    if (Array.isArray(obj)) {
      obj;  // T & any[]
    }
    else {
      obj;  // T
    }
}

function test3<T extends any[] | Record<string, any>>(obj: T) {
    if ('length' in obj) {
      obj;  // T
    }
    else {
      obj;  // T
    }
}


//// [inKeywordTypeguard.js]
class A {
}
class B {
}
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
class AWithOptionalProp {
}
class BWithOptionalProp {
}
function positiveTestClassesWithOptionalProperties(x) {
    if ("a" in x) {
        x.a = "1";
    }
    else {
        x.b = "1";
    }
}
class AWithMethod {
    a() { return ""; }
}
class BWithMethod {
    b() { return ""; }
}
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
class C {
}
class D {
}
function negativeMultipleClassesTest(x) {
    if ("a" in x) {
        x.b = "1";
    }
    else {
        x.a = "1";
    }
}
class ClassWithUnionProp {
}
function negativePropTest(x) {
    if ("a" in x.prop) {
        let y = x.prop.b;
    }
    else {
        let z = x.prop.a;
    }
}
class NegativeClassTest {
    inThis() {
        if ("a" in this.prop) {
            let z = this.prop.b;
        }
        else {
            let y = this.prop.a;
        }
    }
}
class UnreachableCodeDetection {
    inThis() {
        if ("a" in this) {
        }
        else {
            let y = this.a;
        }
    }
}
function positiveIntersectionTest(x) {
    if ("a" in x) {
        let s = x.a;
    }
    else {
        let n = x;
    }
}
if ('extra' in error) {
    error; // Still Error
}
else {
    error; // Error
}
function narrowsToNever(x) {
    let v;
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
        const _never = x;
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
const sym = Symbol();
function f8(x) {
    if ("a" in x && 1 in x && sym in x) {
        x.a;
        x["a"];
        x[1];
        x["1"];
        x[sym];
    }
}
function f9(x) {
    if ("a" in x && "1" in x && sym in x) {
        x.a;
        x["a"];
        x[1];
        x["1"];
        x[sym];
    }
}
function f10(x) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}
function f11(x) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}
function f12(x) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}
function f13(x) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}
function f14(x) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}
function f15(x) {
    if ("a" in x) {
        x;
    }
    else {
        x;
    }
}
function f16(x, y) {
    x = y;
}
// Repro from #50639
function foo(value) {
    if (typeof value === "object" && value !== null && "prop" in value) {
        value; // A & object & Record<"prop", unknown>
    }
}
// Repro from #50954
const checkIsTouchDevice = () => "ontouchstart" in window || "msMaxTouchPoints" in window.navigator;
// Repro from #51501
function isHTMLTable(table) {
    return !!table && 'html' in table;
}
// Repro from #51549
const f = (a) => {
    "foo" in a;
};
// Repro from #53773
function test1(obj) {
    if (Array.isArray(obj) || 'length' in obj) {
        obj; // T
    }
    else {
        obj; // T
    }
}
function test2(obj) {
    if (Array.isArray(obj)) {
        obj; // T & any[]
    }
    else {
        obj; // T
    }
}
function test3(obj) {
    if ('length' in obj) {
        obj; // T
    }
    else {
        obj; // T
    }
}
