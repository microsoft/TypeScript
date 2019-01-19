// @target: es6
// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strictNullChecks: true

// @Filename: controlFlowInstanceof.ts
// Repros from #10167

function f1(s: Set<string> | Set<number>) {
    s = new Set<number>();
    s;  // Set<number>
    if (s instanceof Set) {
        s;  // Set<number>
    }
    s;  // Set<number>
    s.add(42);
}

function f2(s: Set<string> | Set<number>) {
    s = new Set<number>();
    s;  // Set<number>
    if (s instanceof Promise) {
        s;  // Set<number> & Promise<any>
    }
    s;  // Set<number>
    s.add(42);
}

function f3(s: Set<string> | Set<number>) {
    s;  // Set<string> | Set<number>
    if (s instanceof Set) {
        s;  // Set<string> | Set<number>
    }
    else {
        s;  // never
    }
}

function f4(s: Set<string> | Set<number>) {
    s = new Set<number>();
    s;  // Set<number>
    if (s instanceof Set) {
        s;  // Set<number>
    }
    else {
        s;  // never
    }
}

// More tests

class A { a: string }
class B extends A { b: string }
class C extends A { c: string }

function foo(x: A | undefined) {
    x;  // A | undefined
    if (x instanceof B || x instanceof C) {
        x;  // B | C
    }
    x;  // A | undefined
    if (x instanceof B && x instanceof C) {
        x;  // B & C
    }
    x;  // A | undefined
    if (!x) {
        return;
    }
    x;  // A
    if (x instanceof B) {
        x;  // B
        if (x instanceof C) {
            x;  // B & C
        }
        else {
            x;  // B
        }
        x;  // B
    }
    else {
        x;  // A
    }
    x;  // A
}

// X is neither assignable to Y nor a subtype of Y
// Y is assignable to X, but not a subtype of X

interface X {
    x?: string;
}

class Y {
    y: string;
}

function goo(x: X) {
    x;
    if (x instanceof Y) {
        x.y;
    }
    x;
}

// Repro from #27282

declare const x: (() => void)|null;
declare const ctor: Function;

if (x instanceof ctor) {
    x();
}

// Repro from #27550 (based on uglify code)
// @Filename: uglify.js
/** @constructor */
function AtTop(val) { this.val = val }
/** @type {*} */
var v = 1;
if (v instanceof AtTop) {
    v.val
}
