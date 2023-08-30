//// [tests/cases/compiler/unusedPrivateMethodInClass1.ts] ////

//// [unusedPrivateMethodInClass1.ts]
class greeter {
    private function1() {
        var y = 10;
    }
}

//// [unusedPrivateMethodInClass1.js]
var greeter = /** @class */ (function () {
    function greeter() {
    }
    greeter.prototype.function1 = function () {
        var y = 10;
    };
    return greeter;
}());
