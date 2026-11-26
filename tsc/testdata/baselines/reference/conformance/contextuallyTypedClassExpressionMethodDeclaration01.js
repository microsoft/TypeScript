//// [tests/cases/conformance/types/contextualTypes/methodDeclarations/contextuallyTypedClassExpressionMethodDeclaration01.ts] ////

//// [contextuallyTypedClassExpressionMethodDeclaration01.ts]
interface A {
    numProp: number;
}

interface B  {
    strProp: string;
}

interface Foo {
    method1(arg: A): void;
    method2(arg: B): void;
}

function getFoo1(): Foo {
    return class {
        static method1(arg) {
            arg.numProp = 10;
        }
        static method2(arg) {
            arg.strProp = "hello";
        }
    }
}

function getFoo2(): Foo {
    return class {
        static method1 = (arg) => {
            arg.numProp = 10;
        }
        static method2 = (arg) => {
            arg.strProp = "hello";
        }
    }
}

function getFoo3(): Foo {
    return class {
        static method1 = function (arg) {
            arg.numProp = 10;
        }
        static method2 = function (arg) {
            arg.strProp = "hello";
        }
    }
}

//// [contextuallyTypedClassExpressionMethodDeclaration01.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
function getFoo1() {
    return class {
        static method1(arg) {
            arg.numProp = 10;
        }
        static method2(arg) {
            arg.strProp = "hello";
        }
    };
}
function getFoo2() {
    var _a;
    return _a = class {
        },
        _a.method1 = __setFunctionName((arg) => {
            arg.numProp = 10;
        }, "method1"),
        _a.method2 = __setFunctionName((arg) => {
            arg.strProp = "hello";
        }, "method2"),
        _a;
}
function getFoo3() {
    var _a;
    return _a = class {
        },
        _a.method1 = __setFunctionName(function (arg) {
            arg.numProp = 10;
        }, "method1"),
        _a.method2 = __setFunctionName(function (arg) {
            arg.strProp = "hello";
        }, "method2"),
        _a;
}
