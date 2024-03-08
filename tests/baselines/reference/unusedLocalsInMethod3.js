//// [tests/cases/compiler/unusedLocalsInMethod3.ts] ////

//// [unusedLocalsInMethod3.ts]
class greeter {
    public function1() {
        var x, y;
        y = 1;
    }
}

//// [unusedLocalsInMethod3.js]
var greeter = /** @class */ (function () {
    function greeter() {
    }
    greeter.prototype.function1 = function () {
        var x, y;
        y = 1;
    };
    return greeter;
}());
