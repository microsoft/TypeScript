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
function getNumber() {
    return 1;
}
var Example = (function () {
    function Example() {
    }
    Example.prototype.getNumber = function () {
        return 1;
    };
    Example.prototype.doSomething = function (a) {
        if (a === void 0) { a = this.getNumber(); }
        return a;
    };
    __names(Example.prototype, ["getNumber", "doSomething"]);
    return Example;
}());
function weird(a) {
    if (a === void 0) { a = this.getNumber(); }
    return a;
}
var Weird = (function () {
    function Weird() {
    }
    Weird.prototype.doSomething = function (a) {
        if (a === void 0) { a = this.getNumber(); }
        return a;
    };
    __names(Weird.prototype, ["doSomething"]);
    return Weird;
}());
