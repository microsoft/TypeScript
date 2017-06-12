//// [unusedLocalsInMethod2.ts]
class greeter {
    public function1() {
        var x, y = 10;
        y++;
    }
}

//// [unusedLocalsInMethod2.js]
var greeter = (function () {
    function greeter() {
    }
    var proto_1 = greeter.prototype;
    proto_1.function1 = function () {
        var x, y = 10;
        y++;
    };
    return greeter;
}());
