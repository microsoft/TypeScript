//// [unusedPrivateMethodInClass1.ts]
class greeter {
    private function1() {
        var y = 10;
        y++;
    }
}

//// [unusedPrivateMethodInClass1.js]
var greeter = /** @class */ (function () {
    function greeter() {
    }
    greeter.prototype.function1 = function () {
        var y = 10;
        y++;
    };
    return greeter;
}());
