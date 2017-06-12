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
var Result = (function () {
    function Result() {
    }
    return Result;
}());
var Test = (function () {
    function Test() {
    }
    var proto_1 = Test.prototype;
    Object.defineProperty(proto_1, "Property", {
        get: function () {
            var x = 1;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return Test;
}());
var Test2 = (function () {
    function Test2() {
    }
    var proto_2 = Test2.prototype;
    Object.defineProperty(proto_2, "Property", {
        get: function () {
            var x = 1;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return Test2;
}());
