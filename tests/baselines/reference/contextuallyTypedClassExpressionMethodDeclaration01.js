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
    return (function () {
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
    return (function () {
        function class_2() {
        }
        class_2.method1 = function (arg) {
            arg.numProp = 10;
        };
        class_2.method2 = function (arg) {
            arg.strProp = "hello";
        };
        return class_2;
    }());
}
function getFoo3() {
    return (function () {
        function class_3() {
        }
        class_3.method1 = function (arg) {
            arg.numProp = 10;
        };
        class_3.method2 = function (arg) {
            arg.strProp = "hello";
        };
        return class_3;
    }());
}
