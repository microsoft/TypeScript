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


//// [strictFunctionTypes1.js]
"use strict";
var x1 = f1(fo, fs); // (x: string) => void
var x2 = f2("abc", fo, fs); // "abc"
var x3 = f3("abc", fo, fx); // "abc" | "def"
var x4 = f4(fo, fs); // Func<string>


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
