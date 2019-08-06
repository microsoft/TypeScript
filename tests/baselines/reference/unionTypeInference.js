//// [unionTypeInference.ts]
declare const b: boolean;
declare const s: string;
declare const sn: string | number;

declare function f1<T>(x: T, y: string | T): T;

const a1 = f1(1, 2);  // 1 | 2
const a2 = f1(1, "hello");  // 1
const a3 = f1(1, sn);  // number
const a4 = f1(undefined, "abc");  // undefined
const a5 = f1("foo", "bar");  // "foo"
const a6 = f1(true, false);  // boolean
const a7 = f1("hello", 1);  // Error

declare function f2<T>(value: [string, T]): T;

var b1 = f2(["string", true]);  // boolean

declare function f3<T>(x: string | false | T): T;

const c1 = f3(5);  // 5
const c2 = f3(sn);  // number
const c3 = f3(true);  // true
const c4 = f3(b);  // true
const c5 = f3("abc");  // never

declare function f4<T>(x: string & T): T;

const d1 = f4("abc");
const d2 = f4(s);
const d3 = f4(42);  // Error

export interface Foo<T> {
    then<U>(f: (x: T) => U | Foo<U>, g: U): Foo<U>;
}
export interface Bar<T> {
    then<S>(f: (x: T) => S | Bar<S>, g: S): Bar<S>;
}

function qux(p1: Foo<void>, p2: Bar<void>) {
    p1 = p2;
}

// Repros from #32434

declare function foo<T>(x: T | Promise<T>): void;
declare let x: false | Promise<true>;
foo(x);

declare function bar<T>(x: T, y: string | T): T;
const y = bar(1, 2);


//// [unionTypeInference.js]
"use strict";
exports.__esModule = true;
var a1 = f1(1, 2); // 1 | 2
var a2 = f1(1, "hello"); // 1
var a3 = f1(1, sn); // number
var a4 = f1(undefined, "abc"); // undefined
var a5 = f1("foo", "bar"); // "foo"
var a6 = f1(true, false); // boolean
var a7 = f1("hello", 1); // Error
var b1 = f2(["string", true]); // boolean
var c1 = f3(5); // 5
var c2 = f3(sn); // number
var c3 = f3(true); // true
var c4 = f3(b); // true
var c5 = f3("abc"); // never
var d1 = f4("abc");
var d2 = f4(s);
var d3 = f4(42); // Error
function qux(p1, p2) {
    p1 = p2;
}
foo(x);
var y = bar(1, 2);
