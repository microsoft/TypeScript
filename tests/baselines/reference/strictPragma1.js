//// [tests/cases/conformance/pragma/strict/strictPragma1.ts] ////

//// [file1.ts]
// @ts-strict
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;

export class A {
    prop: string;
    constructor() {}
}

declare var c: { member?: string };
c.member.charAt(0);

//// [file2.ts]
// @ts-strict true
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;

export class A {
    prop: string;
    constructor() {}
}

declare var c: { member?: string };
c.member.charAt(0);

//// [file3.ts]
// @ts-strict false
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;

export class A {
    prop: string;
    constructor() {}
}

declare var c: { member?: string };
c.member.charAt(0);

//// [file4.ts]
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;

export class A {
    prop: string;
    constructor() {}
}

declare var c: { member?: string };
c.member.charAt(0);


//// [file1.js]
"use strict";
exports.__esModule = true;
exports.A = exports.b = exports.a = exports.f1 = void 0;
// @ts-strict
function f1(x) { }
exports.f1 = f1;
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right
var a = function (arg) { return 0; };
exports.a = a;
var b = function (arg) { return 0; };
exports.b = b;
exports.a = exports.b;
exports.b = exports.a;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
c.member.charAt(0);
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.A = exports.b = exports.a = exports.f1 = void 0;
// @ts-strict true
function f1(x) { }
exports.f1 = f1;
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right
var a = function (arg) { return 0; };
exports.a = a;
var b = function (arg) { return 0; };
exports.b = b;
exports.a = exports.b;
exports.b = exports.a;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
c.member.charAt(0);
//// [file3.js]
"use strict";
exports.__esModule = true;
exports.A = exports.b = exports.a = exports.f1 = void 0;
// @ts-strict false
function f1(x) { }
exports.f1 = f1;
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right
var a = function (arg) { return 0; };
exports.a = a;
var b = function (arg) { return 0; };
exports.b = b;
exports.a = exports.b;
exports.b = exports.a;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
c.member.charAt(0);
//// [file4.js]
"use strict";
exports.__esModule = true;
exports.A = exports.b = exports.a = exports.f1 = void 0;
function f1(x) { }
exports.f1 = f1;
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right
var a = function (arg) { return 0; };
exports.a = a;
var b = function (arg) { return 0; };
exports.b = b;
exports.a = exports.b;
exports.b = exports.a;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
c.member.charAt(0);
