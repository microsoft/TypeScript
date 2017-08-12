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
var greeter = (function () {
    function greeter() {
    }
    var proto_1 = greeter.prototype;
    proto_1.function1 = function () {
        var y = 10;
        y++;
    };
    proto_1.function2 = function () {
        var y = 10;
        y++;
    };
    proto_1.function3 = function () {
        var y = 10;
        y++;
    };
    return greeter;
}());
