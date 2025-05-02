//// [tests/cases/conformance/expressions/functionCalls/callWithMissingVoid.ts] ////

//// [callWithMissingVoid.ts]
// From #4260
class X<T> {
    f(t: T) {
        return { a: t };
    }
}

declare const x: X<void>;
x.f() // no error because f expects void

declare const xUnion: X<void | number>;
xUnion.f(42) // no error because f accepts number
xUnion.f() // no error because f accepts void

declare const xAny: X<any>;
xAny.f() // error, any still expects an argument

declare const xUnknown: X<unknown>;
xUnknown.f() // error, unknown still expects an argument

declare const xNever: X<never>;
xNever.f() // error, never still expects an argument


// Promise has previously been updated to work without arguments, but to show this fixes the issue too.

class MyPromise<X> {
    constructor(executor: (resolve: (value: X) => void) => void) {

    }
}

new MyPromise<void>(resolve => resolve()); // no error
new MyPromise<void | number>(resolve => resolve()); // no error
new MyPromise<any>(resolve => resolve()); // error, `any` arguments cannot be omitted
new MyPromise<unknown>(resolve => resolve()); // error, `unknown` arguments cannot be omitted
new MyPromise<never>(resolve => resolve()); // error, `never` arguments cannot be omitted


// Multiple parameters

function a(x: number, y: string, z: void): void  {
    
}

a(4, "hello"); // ok
a(4, "hello", void 0); // ok
a(4); // not ok

function b(x: number, y: string, z: void, what: number): void  {
    
}

b(4, "hello", void 0, 2); // ok
b(4, "hello"); // not ok
b(4, "hello", void 0); // not ok
b(4); // not ok

function c(x: number | void, y: void, z: void | string | number): void  {
    
}

c(3, void 0, void 0); // ok
c(3, void 0); // ok
c(3); // ok
c(); // ok


// Spread Parameters

declare function call<TS extends unknown[]>(
    handler: (...args: TS) => unknown,
    ...args: TS): void;

call((x: number, y: number) => x + y) // error
call((x: number, y: number) => x + y, 4, 2) // ok

call((x: number, y: void) => x, 4, void 0) // ok
call((x: number, y: void) => x, 4) // ok
call((x: void, y: void) => 42) // ok
call((x: number | void, y: number | void) => 42) // ok
call((x: number | void, y: number | void) => 42, 4) // ok
call((x: number | void, y: number | void) => 42, 4, 2) // ok


//// [callWithMissingVoid.js]
"use strict";
// From #4260
var X = /** @class */ (function () {
    function X() {
    }
    X.prototype.f = function (t) {
        return { a: t };
    };
    return X;
}());
x.f(); // no error because f expects void
xUnion.f(42); // no error because f accepts number
xUnion.f(); // no error because f accepts void
xAny.f(); // error, any still expects an argument
xUnknown.f(); // error, unknown still expects an argument
xNever.f(); // error, never still expects an argument
// Promise has previously been updated to work without arguments, but to show this fixes the issue too.
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
    }
    return MyPromise;
}());
new MyPromise(function (resolve) { return resolve(); }); // no error
new MyPromise(function (resolve) { return resolve(); }); // no error
new MyPromise(function (resolve) { return resolve(); }); // error, `any` arguments cannot be omitted
new MyPromise(function (resolve) { return resolve(); }); // error, `unknown` arguments cannot be omitted
new MyPromise(function (resolve) { return resolve(); }); // error, `never` arguments cannot be omitted
// Multiple parameters
function a(x, y, z) {
}
a(4, "hello"); // ok
a(4, "hello", void 0); // ok
a(4); // not ok
function b(x, y, z, what) {
}
b(4, "hello", void 0, 2); // ok
b(4, "hello"); // not ok
b(4, "hello", void 0); // not ok
b(4); // not ok
function c(x, y, z) {
}
c(3, void 0, void 0); // ok
c(3, void 0); // ok
c(3); // ok
c(); // ok
call(function (x, y) { return x + y; }); // error
call(function (x, y) { return x + y; }, 4, 2); // ok
call(function (x, y) { return x; }, 4, void 0); // ok
call(function (x, y) { return x; }, 4); // ok
call(function (x, y) { return 42; }); // ok
call(function (x, y) { return 42; }); // ok
call(function (x, y) { return 42; }, 4); // ok
call(function (x, y) { return 42; }, 4, 2); // ok
