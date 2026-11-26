//// [tests/cases/conformance/types/members/duplicatePropertyNames.ts] ////

//// [duplicatePropertyNames.ts]
// duplicate property names are an error in all types

interface Number {
    foo: string;
    foo: string;
}

interface String {
    foo(): string;
    foo(): string;
}

interface Array<T> {
    foo: T;
    foo: T;
}

class C {
    foo: string;
    foo: string;

    bar(x) { }
    bar(x) { }

    baz = () => { }
    baz = () => { }
}

interface I {
    foo: string;
    foo: string;
}

var a: {
    foo: string;
    foo: string;

    bar: () => {};
    bar: () => {};
}

var b = {
    foo: '',
    foo: '',
    bar: () => { },
    bar: () => { }
}


//// [duplicatePropertyNames.js]
"use strict";
// duplicate property names are an error in all types
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class C {
    constructor() {
        this.baz = __setFunctionName(() => { }, "baz");
        this.baz = __setFunctionName(() => { }, "baz");
    }
    bar(x) { }
    bar(x) { }
}
var a;
var b = {
    foo: '',
    foo: '',
    bar: () => { },
    bar: () => { }
};
