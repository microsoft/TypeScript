//// [unusedPrivateMethodInClass1.ts]
class greeter {
    private function1() {
        var y = 10;
        y++;
    }
}

//// [unusedPrivateMethodInClass1.js]
var greeter = (function () {
    function greeter() {
    }
    var proto_1 = greeter.prototype;
    proto_1.function1 = function () {
        var y = 10;
        y++;
    };
    return greeter;
}());
