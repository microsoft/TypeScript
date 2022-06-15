//// [instantiationExpressionErrors.ts]
declare let f: { <T>(): T, g<U>(): U };

// Type arguments in member expressions

const a1 = f<number>;  // { (): number; g<U>(): U; }
const a2 = f.g<number>;  // () => number
const a3 = f<number>.g;  // <U>() => U
const a4 = f<number>.g<number>;  // () => number
const a5 = f['g']<number>;  // () => number

// `[` is an expression starter and cannot immediately follow a type argument list

const a6 = f<number>['g'];  // Error
const a7 = (f<number>)['g'];

// An `<` cannot immediately follow a type argument list

const a8 = f<number><number>;  // Relational operator error
const a9 = (f<number>)<number>;  // Error, no applicable signatures

// Type arguments with `?.` token

const b1 = f?.<number>;  // Error, `(` expected
const b2 = f?.<number>();
const b3 = f<number>?.();
const b4 = f<number>?.<number>();  // Error, expected no type arguments

// Parsed as function call, even though this differs from JavaScript

const x1 = f<true>
(true);

// Parsed as relational expression

const x2 = f<true>
true;

// Parsed as instantiation expression

const x3 = f<true>;
true;

// Parsed as instantiation expression

const x4 = f<true>
if (true) {}

const x5 = f<true>
let yy = 0;

const x6 = f<true>
interface I {}

let x10 = f<true>
this.bar()

let x11 = f<true>
function bar() {}

let x12 = f<true>
class C {}

let x13 = f<true>
bar()

let x14 = f<true>
void bar()

class C1 {
    static specialFoo = f<string>
    static bar = 123
}

class C2 {
    public specialFoo = f<string>
    public bar = 123
}

class C3 {
    private specialFoo = f<string>
    private bar = 123
}

class C4 {
    protected specialFoo = f<string>
    protected bar = 123
}

// Repro from #49551

const enum MyVer { v1 = 1, v2 = 2 }
let ver = 21
const a = ver < (MyVer.v1 >= MyVer.v2 ? MyVer.v1 : MyVer.v2)


//// [instantiationExpressionErrors.js]
"use strict";
var _a, _b;
// Type arguments in member expressions
var a1 = (f); // { (): number; g<U>(): U; }
var a2 = (f.g); // () => number
var a3 = f.g; // <U>() => U
var a4 = (f.g); // () => number
var a5 = (f['g']); // () => number
// `[` is an expression starter and cannot immediately follow a type argument list
var a6 = f < number > ['g']; // Error
var a7 = (f)['g'];
// An `<` cannot immediately follow a type argument list
var a8 = f < number > ; // Relational operator error
var a9 = ((f)); // Error, no applicable signatures
// Type arguments with `?.` token
var b1 = f === null || f === void 0 ? void 0 : f(); // Error, `(` expected
var b2 = f === null || f === void 0 ? void 0 : f();
var b3 = (_a = (f)) === null || _a === void 0 ? void 0 : _a();
var b4 = (_b = (f)) === null || _b === void 0 ? void 0 : _b(); // Error, expected no type arguments
// Parsed as function call, even though this differs from JavaScript
var x1 = f(true);
// Parsed as relational expression
var x2 = f < true >
    true;
// Parsed as instantiation expression
var x3 = (f);
true;
// Parsed as instantiation expression
var x4 = (f);
if (true) { }
var x5 = f < true >
    let, yy = 0;
var x6 = f < true >
    interface, I, _c = void 0;
var x10 = f < true >
    this.bar();
var x11 = f < true >
    function bar() { };
var x12 = f < true > /** @class */ (function () {
    function C() {
    }
    return C;
}());
var x13 = f < true >
    bar();
var x14 = f < true >
    void bar();
var C1 = /** @class */ (function () {
    function C1() {
        this.bar = 123;
    }
    C1.specialFoo = f < string >
        static;
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
        this.specialFoo = f < string >
            public;
        this.bar = 123;
    }
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
        this.specialFoo = f < string >
            private;
        this.bar = 123;
    }
    return C3;
}());
var C4 = /** @class */ (function () {
    function C4() {
        this.specialFoo = f < string >
            protected;
        this.bar = 123;
    }
    return C4;
}());
var ver = 21;
var a = ver < (1 /* MyVer.v1 */ >= 2 /* MyVer.v2 */ ? 1 /* MyVer.v1 */ : 2 /* MyVer.v2 */);


//// [instantiationExpressionErrors.d.ts]
declare let f: {
    <T>(): T;
    g<U>(): U;
};
declare const a1: {
    (): number;
    g<U>(): U;
};
declare const a2: () => number;
declare const a3: <U>() => U;
declare const a4: () => number;
declare const a5: () => number;
declare const a6: boolean;
declare const a7: <U>() => U;
declare const a8: boolean;
declare const a9: {
    g<U>(): U;
};
declare const b1: number;
declare const b2: number;
declare const b3: number;
declare const b4: number;
declare const x1: true;
declare const x2: boolean;
declare const x3: {
    (): true;
    g<U>(): U;
};
declare const x4: {
    (): true;
    g<U>(): U;
};
declare const x5: boolean, yy = 0;
declare const x6: boolean, I: any;
declare let x10: boolean;
declare let x11: boolean;
declare let x12: boolean;
declare let x13: boolean;
declare let x14: boolean;
declare class C1 {
    static specialFoo: boolean;
    bar: number;
}
declare class C2 {
    specialFoo: boolean;
    bar: number;
}
declare class C3 {
    private specialFoo;
    bar: number;
}
declare class C4 {
    protected specialFoo: boolean;
    bar: number;
}
declare const enum MyVer {
    v1 = 1,
    v2 = 2
}
declare let ver: number;
declare const a: boolean;
