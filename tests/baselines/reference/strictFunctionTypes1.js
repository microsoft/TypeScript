//// [tests/cases/compiler/strictFunctionTypes1.ts] ////

//// [strictFunctionTypes1.ts]
declare function f1<T>(f1: (x: T) => void, f2: (x: T) => void): (x: T) => void;
declare function f2<T>(obj: T, f1: (x: T) => void, f2: (x: T) => void): T;
declare function f3<T>(obj: T, f1: (x: T) => void, f2: (f: (x: T) => void) => void): T;

interface Func<T> { (x: T): void }

declare function f4<T>(f1: Func<T>, f2: Func<T>): Func<T>;

declare function fo(x: Object): void;
declare function fs(x: string): void;
declare function fx(f: (x: "def") => void): void;

const x1 = f1(fo, fs);  // (x: string) => void
const x2 = f2("abc", fo, fs);  // "abc"
const x3 = f3("abc", fo, fx);  // "abc" | "def"
const x4 = f4(fo, fs);  // Func<string>

declare const never: never;

const x10 = f2(never, fo, fs);  // string
const x11 = f3(never, fo, fx);  // "def"

// Repro from #21112

declare function foo<T>(a: ReadonlyArray<T>): T;
let x = foo([]);  // never

// Modified repros from #26127

interface A { a: string }
interface B extends A { b: string }

declare function acceptUnion(x: A | number): void;
declare function acceptA(x: A): void;

declare let a: A;
declare let b: B;

declare function coAndContra<T>(value: T, func: (t: T) => void): T;

const t1: A = coAndContra(a, acceptUnion);
const t2: B = coAndContra(b, acceptA);
const t3: A = coAndContra(never, acceptA);

declare function coAndContraArray<T>(value: T[], func: (t: T) => void): T[];

const t4: A[] = coAndContraArray([a], acceptUnion);
const t5: B[] = coAndContraArray([b], acceptA);
const t6: A[] = coAndContraArray([], acceptA);


//// [strictFunctionTypes1.js]
"use strict";
var x1 = f1(fo, fs); // (x: string) => void
var x2 = f2("abc", fo, fs); // "abc"
var x3 = f3("abc", fo, fx); // "abc" | "def"
var x4 = f4(fo, fs); // Func<string>
var x10 = f2(never, fo, fs); // string
var x11 = f3(never, fo, fx); // "def"
var x = foo([]); // never
var t1 = coAndContra(a, acceptUnion);
var t2 = coAndContra(b, acceptA);
var t3 = coAndContra(never, acceptA);
var t4 = coAndContraArray([a], acceptUnion);
var t5 = coAndContraArray([b], acceptA);
var t6 = coAndContraArray([], acceptA);


//// [strictFunctionTypes1.d.ts]
declare function f1<T>(f1: (x: T) => void, f2: (x: T) => void): (x: T) => void;
declare function f2<T>(obj: T, f1: (x: T) => void, f2: (x: T) => void): T;
declare function f3<T>(obj: T, f1: (x: T) => void, f2: (f: (x: T) => void) => void): T;
interface Func<T> {
    (x: T): void;
}
declare function f4<T>(f1: Func<T>, f2: Func<T>): Func<T>;
declare function fo(x: Object): void;
declare function fs(x: string): void;
declare function fx(f: (x: "def") => void): void;
declare const x1: (x: string) => void;
declare const x2 = "abc";
declare const x3: string;
declare const x4: Func<string>;
declare const never: never;
declare const x10: string;
declare const x11: "def";
declare function foo<T>(a: ReadonlyArray<T>): T;
declare let x: never;
interface A {
    a: string;
}
interface B extends A {
    b: string;
}
declare function acceptUnion(x: A | number): void;
declare function acceptA(x: A): void;
declare let a: A;
declare let b: B;
declare function coAndContra<T>(value: T, func: (t: T) => void): T;
declare const t1: A;
declare const t2: B;
declare const t3: A;
declare function coAndContraArray<T>(value: T[], func: (t: T) => void): T[];
declare const t4: A[];
declare const t5: B[];
declare const t6: A[];
