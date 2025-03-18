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
    return class {
        static method1 = (arg) => {
            arg.numProp = 10;
        };
        static method2 = (arg) => {
            arg.strProp = "hello";
        };
    };
}
function getFoo3() {
    return class {
        static method1 = function (arg) {
            arg.numProp = 10;
        };
        static method2 = function (arg) {
            arg.strProp = "hello";
        };
    };
}
