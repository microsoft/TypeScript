//// [unusedPrivateMethodInClass3.ts]
class greeter {
    private function1() {
        var y = 10;
        y++;
    }

    private function2() {
        var y = 10;
        y++;
    }

    public function3() {
        var y = 10;
        y++;
    }
}

//// [unusedPrivateMethodInClass3.js]
var greeter = /** @class */ (function () {
    function greeter() {
    }
    greeter.prototype.function1 = function () {
        var y = 10;
        y++;
    };
    greeter.prototype.function2 = function () {
        var y = 10;
        y++;
    };
    greeter.prototype.function3 = function () {
        var y = 10;
        y++;
    };
    return greeter;
}());
