//// [genericRestParameters3.ts]
declare let f1: (x: string, ...args: [string] | [number, boolean]) => void;
declare let f2: (x: string, y: string) => void;
declare let f3: (x: string, y: number, z: boolean) => void;
declare let f4: (...args: [string, string] | [string, number, boolean]) => void;

declare const tt: [string] | [number, boolean];

f1("foo", "abc");
f1("foo", 10, true);
f1("foo", ...tt);
f1("foo", 10);  // Error
f1("foo");  // Error

f2 = f1;
f3 = f1;
f4 = f1;  // Error, misaligned complex rest types
f1 = f2;  // Error
f1 = f3;  // Error
f1 = f4;  // Error, misaligned complex rest types

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


//// [genericRestParameters3.js]
"use strict";
f1("foo", "abc");
f1("foo", 10, true);
f1.apply(void 0, ["foo"].concat(tt));
f1("foo", 10); // Error
f1("foo"); // Error
f2 = f1;
f3 = f1;
f4 = f1; // Error, misaligned complex rest types
f1 = f2; // Error
f1 = f3; // Error
f1 = f4; // Error, misaligned complex rest types
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


//// [genericRestParameters3.d.ts]
declare let f1: (x: string, ...args: [string] | [number, boolean]) => void;
declare let f2: (x: string, y: string) => void;
declare let f3: (x: string, y: number, z: boolean) => void;
declare let f4: (...args: [string, string] | [string, number, boolean]) => void;
declare const tt: [string] | [number, boolean];
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
