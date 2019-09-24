//// [neverReturningFunctions1.ts]
function fail(message?: string): never {
    throw new Error(message);
}

function f01(x: string | undefined) {
    if (x === undefined) fail("undefined argument");
    x.length;  // string
}

function f02(x: number): number {
    if (x >= 0) return x;
    fail("negative number");
    x;  // Unreachable
}

function f03(x: string) {
    x;  // string
    fail();
    x;  // Unreachable
}

function f11(x: string | undefined, fail: (message?: string) => never) {
    if (x === undefined) fail("undefined argument");
    x.length;  // string
}

function f12(x: number, fail: (message?: string) => never): number {
    if (x >= 0) return x;
    fail("negative number");
    x;  // Unreachable
}

function f13(x: string, fail: (message?: string) => never) {
    x;  // string
    fail();
    x;  // Unreachable
}

namespace Debug {
    export declare function fail(message?: string): never;
}

function f21(x: string | undefined) {
    if (x === undefined) Debug.fail("undefined argument");
    x.length;  // string
}

function f22(x: number): number {
    if (x >= 0) return x;
    Debug.fail("negative number");
    x;  // Unreachable
}

function f23(x: string) {
    x;  // string
    Debug.fail();
    x;  // Unreachable
}

function f24(x: string) {
    x;  // string
    ((Debug).fail)();
    x;  // Unreachable
}

class Test {
    fail(message?: string): never {
        throw new Error(message);
    }
    f1(x: string | undefined) {
        if (x === undefined) this.fail("undefined argument");
        x.length;  // string
    }
    f2(x: number): number {
        if (x >= 0) return x;
        this.fail("negative number");
        x;  // Unreachable
    }
    f3(x: string) {
        x;  // string
        this.fail();
        x;  // Unreachable
    }
}

function f30(x: string | number | undefined) {
    if (typeof x === "string") {
        fail();
        x;  // Unreachable
    }
    else {
        x;  // number | undefined
        if (x !== undefined) {
            x;  // number
            fail();
            x;  // Unreachable
        }
        else {
            x;  // undefined
            fail();
            x;  // Unreachable
        }
        x;  // Unreachable
    }
    x;  // Unreachable
}

function f31(x: { a: string | number }) {
    if (typeof x.a === "string") {
        fail();
        x;    // Unreachable
        x.a;  // Unreachable
    }
    x;    // { a: string | number }
    x.a;  // number
}

function f40(x: number) {
    try {
        x;
        fail();
        x;  // Unreachable
    }
    finally {
        x;
        fail();
        x;  // Unreachable
    }
    x;  // Unreachable
}

function f41(x: number) {
    try {
        x;
    }
    finally {
        x;
        fail();
        x;  // Unreachable
    }
    x;  // Unreachable
}

function f42(x: number) {
    try {
        x;
        fail();
        x;  // Unreachable
    }
    finally {
        x;
    }
    x;  // Unreachable
}


//// [neverReturningFunctions1.js]
"use strict";
function fail(message) {
    throw new Error(message);
}
function f01(x) {
    if (x === undefined)
        fail("undefined argument");
    x.length; // string
}
function f02(x) {
    if (x >= 0)
        return x;
    fail("negative number");
    x; // Unreachable
}
function f03(x) {
    x; // string
    fail();
    x; // Unreachable
}
function f11(x, fail) {
    if (x === undefined)
        fail("undefined argument");
    x.length; // string
}
function f12(x, fail) {
    if (x >= 0)
        return x;
    fail("negative number");
    x; // Unreachable
}
function f13(x, fail) {
    x; // string
    fail();
    x; // Unreachable
}
var Debug;
(function (Debug) {
})(Debug || (Debug = {}));
function f21(x) {
    if (x === undefined)
        Debug.fail("undefined argument");
    x.length; // string
}
function f22(x) {
    if (x >= 0)
        return x;
    Debug.fail("negative number");
    x; // Unreachable
}
function f23(x) {
    x; // string
    Debug.fail();
    x; // Unreachable
}
function f24(x) {
    x; // string
    ((Debug).fail)();
    x; // Unreachable
}
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.fail = function (message) {
        throw new Error(message);
    };
    Test.prototype.f1 = function (x) {
        if (x === undefined)
            this.fail("undefined argument");
        x.length; // string
    };
    Test.prototype.f2 = function (x) {
        if (x >= 0)
            return x;
        this.fail("negative number");
        x; // Unreachable
    };
    Test.prototype.f3 = function (x) {
        x; // string
        this.fail();
        x; // Unreachable
    };
    return Test;
}());
function f30(x) {
    if (typeof x === "string") {
        fail();
        x; // Unreachable
    }
    else {
        x; // number | undefined
        if (x !== undefined) {
            x; // number
            fail();
            x; // Unreachable
        }
        else {
            x; // undefined
            fail();
            x; // Unreachable
        }
        x; // Unreachable
    }
    x; // Unreachable
}
function f31(x) {
    if (typeof x.a === "string") {
        fail();
        x; // Unreachable
        x.a; // Unreachable
    }
    x; // { a: string | number }
    x.a; // number
}
function f40(x) {
    try {
        x;
        fail();
        x; // Unreachable
    }
    finally {
        x;
        fail();
        x; // Unreachable
    }
    x; // Unreachable
}
function f41(x) {
    try {
        x;
    }
    finally {
        x;
        fail();
        x; // Unreachable
    }
    x; // Unreachable
}
function f42(x) {
    try {
        x;
        fail();
        x; // Unreachable
    }
    finally {
        x;
    }
    x; // Unreachable
}


//// [neverReturningFunctions1.d.ts]
declare function fail(message?: string): never;
declare function f01(x: string | undefined): void;
declare function f02(x: number): number;
declare function f03(x: string): void;
declare function f11(x: string | undefined, fail: (message?: string) => never): void;
declare function f12(x: number, fail: (message?: string) => never): number;
declare function f13(x: string, fail: (message?: string) => never): void;
declare namespace Debug {
    function fail(message?: string): never;
}
declare function f21(x: string | undefined): void;
declare function f22(x: number): number;
declare function f23(x: string): void;
declare function f24(x: string): void;
declare class Test {
    fail(message?: string): never;
    f1(x: string | undefined): void;
    f2(x: number): number;
    f3(x: string): void;
}
declare function f30(x: string | number | undefined): void;
declare function f31(x: {
    a: string | number;
}): void;
declare function f40(x: number): void;
declare function f41(x: number): void;
declare function f42(x: number): void;
