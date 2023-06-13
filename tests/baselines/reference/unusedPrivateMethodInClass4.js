//// [tests/cases/compiler/unusedPrivateMethodInClass4.ts] ////

//// [unusedPrivateMethodInClass4.ts]
class greeter {
    private function1() {
        var y = 10;
    }

    private function2() {
        var y = 10;
    }

    public function3() {
        var y = 10;
        this.function2();
    }
}

//// [unusedPrivateMethodInClass4.js]
var greeter = /** @class */ (function () {
    function greeter() {
    }
    greeter.prototype.function1 = function () {
        var y = 10;
    };
    greeter.prototype.function2 = function () {
        var y = 10;
    };
    greeter.prototype.function3 = function () {
        var y = 10;
        this.function2();
    };
    return greeter;
}());
