//// [tests/cases/compiler/unusedLocalsInMethod2.ts] ////

//// [unusedLocalsInMethod2.ts]
class greeter {
    public function1() {
        var x, y = 10;
    }
}

//// [unusedLocalsInMethod2.js]
var greeter = /** @class */ (function () {
    function greeter() {
    }
    greeter.prototype.function1 = function () {
        var x, y = 10;
    };
    return greeter;
}());
