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
    return /** @class */ (function () {
        function class_1() {
        }
        class_1.method1 = function (arg) {
            arg.numProp = 10;
        };
        class_1.method2 = function (arg) {
            arg.strProp = "hello";
        };
        return class_1;
    }());
}
function getFoo2() {
    var _a;
    return _a = /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }()),
        _a.method1 = function (arg) {
            arg.numProp = 10;
        },
        _a.method2 = function (arg) {
            arg.strProp = "hello";
        },
        _a;
}
function getFoo3() {
    var _a;
    return _a = /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }()),
        _a.method1 = function (arg) {
            arg.numProp = 10;
        },
        _a.method2 = function (arg) {
            arg.strProp = "hello";
        },
        _a;
}
