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
var Example = (function () {
    function Example() {
    }
    var proto_1 = Example.prototype;
    proto_1.getNumber = function () {
        return 1;
    };
    proto_1.doSomething = function (a) {
        if (a === void 0) { a = this.getNumber(); }
        return a;
    };
    return Example;
}());
function weird(a) {
    if (a === void 0) { a = this.getNumber(); }
    return a;
}
var Weird = (function () {
    function Weird() {
    }
    var proto_2 = Weird.prototype;
    proto_2.doSomething = function (a) {
        if (a === void 0) { a = this.getNumber(); }
        return a;
    };
    return Weird;
}());
