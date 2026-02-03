//// [tests/cases/compiler/nonNullableTypes1.ts] ////

//// [nonNullableTypes1.ts]
function f1<T>(x: T) {
    let y = x || "hello";  // NonNullable<T> | string
}

function error(): never {
    throw new Error();
}

function f2<T>(x: T) {  // NonNullable<T>
    return x || error();
}

function f3(x: unknown) {
    let y = x!;  // {}
}

function f4<T extends { x: string } | undefined>(obj: T) {
    if (obj?.x === "hello") {
        obj;  // NonNullable<T>
    }
    if (obj?.x) {
        obj;  // NonNullable<T>
    }
    if (typeof obj?.x === "string") {
        obj;  // NonNullable<T>
    }
}

class A {
    x = "hello";
    foo() {
        let zz = this?.x;  // string
    }
}


//// [nonNullableTypes1.js]
"use strict";
function f1(x) {
    var y = x || "hello"; // NonNullable<T> | string
}
function error() {
    throw new Error();
}
function f2(x) {
    return x || error();
}
function f3(x) {
    var y = x; // {}
}
function f4(obj) {
    if ((obj === null || obj === void 0 ? void 0 : obj.x) === "hello") {
        obj; // NonNullable<T>
    }
    if (obj === null || obj === void 0 ? void 0 : obj.x) {
        obj; // NonNullable<T>
    }
    if (typeof (obj === null || obj === void 0 ? void 0 : obj.x) === "string") {
        obj; // NonNullable<T>
    }
}
var A = /** @class */ (function () {
    function A() {
        this.x = "hello";
    }
    A.prototype.foo = function () {
        var zz = this === null || this === void 0 ? void 0 : this.x; // string
    };
    return A;
}());


//// [nonNullableTypes1.d.ts]
declare function f1<T>(x: T): void;
declare function error(): never;
declare function f2<T>(x: T): NonNullable<T>;
declare function f3(x: unknown): void;
declare function f4<T extends {
    x: string;
} | undefined>(obj: T): void;
declare class A {
    x: string;
    foo(): void;
}
