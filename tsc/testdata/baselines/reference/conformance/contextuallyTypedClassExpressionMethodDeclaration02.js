//// [tests/cases/conformance/types/contextualTypes/methodDeclarations/contextuallyTypedClassExpressionMethodDeclaration02.ts] ////

//// [contextuallyTypedClassExpressionMethodDeclaration02.ts]
interface A {
    numProp: number;
}

interface B  {
    strProp: string;
}

interface Foo {
    new (): Bar;
}

interface Bar {
    method1(arg: A): void;
    method2(arg: B): void;
}

function getFoo1(): Foo {
    return class {
        method1(arg) {
            arg.numProp = 10;
        }
        method2(arg) {
            arg.strProp = "hello";
        }
    }
}

function getFoo2(): Foo {
    return class {
        method1 = (arg) => {
            arg.numProp = 10;
        }
        method2 = (arg) => {
            arg.strProp = "hello";
        }
    }
}

function getFoo3(): Foo {
    return class {
        method1 = function (arg) {
            arg.numProp = 10;
        }
        method2 = function (arg) {
            arg.strProp = "hello";
        }
    }
}

//// [contextuallyTypedClassExpressionMethodDeclaration02.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
function getFoo1() {
    return class {
        method1(arg) {
            arg.numProp = 10;
        }
        method2(arg) {
            arg.strProp = "hello";
        }
    };
}
function getFoo2() {
    return class {
        constructor() {
            this.method1 = __setFunctionName((arg) => {
                arg.numProp = 10;
            }, "method1");
            this.method2 = __setFunctionName((arg) => {
                arg.strProp = "hello";
            }, "method2");
        }
    };
}
function getFoo3() {
    return class {
        constructor() {
            this.method1 = __setFunctionName(function (arg) {
                arg.numProp = 10;
            }, "method1");
            this.method2 = __setFunctionName(function (arg) {
                arg.strProp = "hello";
            }, "method2");
        }
    };
}
