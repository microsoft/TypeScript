//// [tests/cases/compiler/accessorsEmit.ts] ////

//// [accessorsEmit.ts]
class Result { }

class Test {
    get Property(): Result {
        var x = 1;
        return null;
    }
}

class Test2 {
    get Property() {
        var x = 1;
        return null;
    }
}

//// [accessorsEmit.js]
var Result = /** @class */ (function () {
    function Result() {
    }
    return Result;
}());
var Test = /** @class */ (function () {
    function Test() {
    }
    Object.defineProperty(Test.prototype, "Property", {
        get: function () {
            var x = 1;
            return null;
        },
        enumerable: false,
        configurable: true
    });
    return Test;
}());
var Test2 = /** @class */ (function () {
    function Test2() {
    }
    Object.defineProperty(Test2.prototype, "Property", {
        get: function () {
            var x = 1;
            return null;
        },
        enumerable: false,
        configurable: true
    });
    return Test2;
}());
