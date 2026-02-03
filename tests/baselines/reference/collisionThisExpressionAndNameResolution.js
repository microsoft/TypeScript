//// [tests/cases/compiler/collisionThisExpressionAndNameResolution.ts] ////

//// [collisionThisExpressionAndNameResolution.ts]
var console : {
    log(message: any);
}
class Foo {
    x() {
        var _this = 10; // Local var. No this capture in x(), so no conflict.
        function inner() {
            console.log(_this); // Error as this doesnt not resolve to user defined _this
            return x => this;   // New scope.  So should inject new _this capture into function inner
        }
    }
}

//// [collisionThisExpressionAndNameResolution.js]
var console;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.x = function () {
        var _this = 10; // Local var. No this capture in x(), so no conflict.
        function inner() {
            var _this_1 = this;
            console.log(_this); // Error as this doesnt not resolve to user defined _this
            return function (x) { return _this_1; }; // New scope.  So should inject new _this capture into function inner
        }
    };
    return Foo;
}());
