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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
function getFoo1() {
    return (function () {
        function class_1() {
        }
        class_1.prototype.method1 = function (arg) {
            arg.numProp = 10;
        };
        class_1.prototype.method2 = function (arg) {
            arg.strProp = "hello";
        };
        __names(class_1.prototype, ["method1", "method2"]);
        return class_1;
    }());
}
function getFoo2() {
    return (function () {
        function class_2() {
            this.method1 = function (arg) {
                arg.numProp = 10;
            };
            this.method2 = function (arg) {
                arg.strProp = "hello";
            };
        }
        return class_2;
    }());
}
function getFoo3() {
    return (function () {
        function class_3() {
            this.method1 = function (arg) {
                arg.numProp = 10;
            };
            this.method2 = function (arg) {
                arg.strProp = "hello";
            };
        }
        return class_3;
    }());
}
