//// [inferParameterWithMethodCallInitializer.ts]
function getNumber(): number {
    return 1;
}
class Example {
    getNumber(): number {
        return 1;
    }
    doSomething(a = this.getNumber()): typeof a {
        return a;
    }
}
function weird(this: Example, a = this.getNumber()) {
    return a;
}
class Weird {
    doSomething(this: Example, a = this.getNumber()) {
        return a;
    }
}


//// [inferParameterWithMethodCallInitializer.js]
function getNumber() {
    return 1;
}
var Example = /** @class */ (function () {
    function Example() {
    }
    Example.prototype.getNumber = function () {
        return 1;
    };
    Example.prototype.doSomething = function (a) {
        if (a === void 0) { a = this.getNumber(); }
        return a;
    };
    return Example;
}());
function weird(a) {
    if (a === void 0) { a = this.getNumber(); }
    return a;
}
var Weird = /** @class */ (function () {
    function Weird() {
    }
    Weird.prototype.doSomething = function (a) {
        if (a === void 0) { a = this.getNumber(); }
        return a;
    };
    return Weird;
}());
