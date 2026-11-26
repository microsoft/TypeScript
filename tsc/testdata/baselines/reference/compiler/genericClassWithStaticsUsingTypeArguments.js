//// [tests/cases/compiler/genericClassWithStaticsUsingTypeArguments.ts] ////

//// [genericClassWithStaticsUsingTypeArguments.ts]
// Should be error to use 'T' in all declarations within Foo.
class Foo<T> {
    static a = (n: T) => { };

    static b: T;

    static c: T[] = [];

    static d = false || ((x: T) => x || undefined)(null)

    static e = function (x: T) { return null; }

    static f(xs: T[]): T[] {
        return xs.reverse();
    }
}


//// [genericClassWithStaticsUsingTypeArguments.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
// Should be error to use 'T' in all declarations within Foo.
class Foo {
    static f(xs) {
        return xs.reverse();
    }
}
Foo.a = __setFunctionName((n) => { }, "a");
Foo.c = [];
Foo.d = false || ((x) => x || undefined)(null);
Foo.e = __setFunctionName(function (x) { return null; }, "e");
