//// [tests/cases/conformance/types/rest/genericRestParameters3.ts] ////

//// [genericRestParameters3.ts]
declare let f1: (x: string, ...args: [string] | [number, boolean]) => void;
declare let f2: (x: string, y: string) => void;
declare let f3: (x: string, y: number, z: boolean) => void;
declare let f4: (...args: [string, string] | [string, number, boolean]) => void;

declare const t1: [string] | [number, boolean];
declare const t2: readonly [string] | [number, boolean];
declare const t3: [string] | readonly [number, boolean];
declare const t4: readonly [string] | readonly [number, boolean];

f1("foo", "abc");
f1("foo", 10, true);
f1("foo", ...t1);
f1("foo", ...t2);
f1("foo", ...t3);
f1("foo", ...t4);
f1("foo", 10);  // Error
f1("foo");  // Error

f2 = f1;
f3 = f1;
f4 = f1;
f1 = f2;  // Error
f1 = f3;  // Error
f1 = f4;

// Repro from #26110

interface CoolArray<E> extends Array<E> { 
    hello: number;
}

declare function foo<T extends any[]>(cb: (...args: T) => void): void;

foo<CoolArray<any>>();     // Error
foo<CoolArray<any>>(100);  // Error
foo<CoolArray<any>>(foo);  // Error

function bar<T extends any[]>(...args: T): T {
    return args;
}

let a = bar(10, 20);
let b = bar<CoolArray<number>>(10, 20);  // Error

declare function baz<T>(...args: CoolArray<T>): void;
declare const ca: CoolArray<number>;

baz();       // Error
baz(1);      // Error
baz(1, 2);   // Error
baz(...ca);  // Error

// Repro from #26491

declare function hmm<A extends [] | [number, string]>(...args: A): void;
hmm(); // okay, A = []
hmm(1, "s"); // okay, A = [1, "s"]
hmm("what"); // no error?  A = [] | [number, string] ?

// Repro from #35066

declare function foo2(...args: string[] | number[]): void;
let x2: ReadonlyArray<string> = ["hello"];
foo2(...x2);

// Repros from #47754

type RestParams = [y: string] | [y: number];

type Signature = (x: string, ...rest: RestParams) => void;

type MergedParams = Parameters<Signature>;  // [x: string, y: string] | [x: string, y: number]

declare let ff1: (...rest: [string, string] | [string, number]) => void;
declare let ff2: (x: string, ...rest: [string] | [number]) => void;

ff1 = ff2;
ff2 = ff1;

function ff3<A extends unknown[]>(s1: (...args: [x: string, ...rest: A | [number]]) => void, s2: (x: string, ...rest: A | [number]) => void) {
    s1 = s2;
    s2 = s1;
}


//// [genericRestParameters3.js]
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
f1("foo", "abc");
f1("foo", 10, true);
f1.apply(void 0, __spreadArray(["foo"], t1, false));
f1.apply(void 0, __spreadArray(["foo"], t2, false));
f1.apply(void 0, __spreadArray(["foo"], t3, false));
f1.apply(void 0, __spreadArray(["foo"], t4, false));
f1("foo", 10); // Error
f1("foo"); // Error
f2 = f1;
f3 = f1;
f4 = f1;
f1 = f2; // Error
f1 = f3; // Error
f1 = f4;
foo(); // Error
foo(100); // Error
foo(foo); // Error
function bar() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
}
var a = bar(10, 20);
var b = bar(10, 20); // Error
baz(); // Error
baz(1); // Error
baz(1, 2); // Error
baz.apply(void 0, ca); // Error
hmm(); // okay, A = []
hmm(1, "s"); // okay, A = [1, "s"]
hmm("what"); // no error?  A = [] | [number, string] ?
var x2 = ["hello"];
foo2.apply(void 0, x2);
ff1 = ff2;
ff2 = ff1;
function ff3(s1, s2) {
    s1 = s2;
    s2 = s1;
}


//// [genericRestParameters3.d.ts]
declare let f1: (x: string, ...args: [string] | [number, boolean]) => void;
declare let f2: (x: string, y: string) => void;
declare let f3: (x: string, y: number, z: boolean) => void;
declare let f4: (...args: [string, string] | [string, number, boolean]) => void;
declare const t1: [string] | [number, boolean];
declare const t2: readonly [string] | [number, boolean];
declare const t3: [string] | readonly [number, boolean];
declare const t4: readonly [string] | readonly [number, boolean];
interface CoolArray<E> extends Array<E> {
    hello: number;
}
declare function foo<T extends any[]>(cb: (...args: T) => void): void;
declare function bar<T extends any[]>(...args: T): T;
declare let a: [number, number];
declare let b: CoolArray<number>;
declare function baz<T>(...args: CoolArray<T>): void;
declare const ca: CoolArray<number>;
declare function hmm<A extends [] | [number, string]>(...args: A): void;
declare function foo2(...args: string[] | number[]): void;
declare let x2: ReadonlyArray<string>;
type RestParams = [y: string] | [y: number];
type Signature = (x: string, ...rest: RestParams) => void;
type MergedParams = Parameters<Signature>;
declare let ff1: (...rest: [string, string] | [string, number]) => void;
declare let ff2: (x: string, ...rest: [string] | [number]) => void;
declare function ff3<A extends unknown[]>(s1: (...args: [x: string, ...rest: A | [number]]) => void, s2: (x: string, ...rest: A | [number]) => void): void;
