//// [unusedLocalsInMethod1.ts]
class greeter {
    public function1() {
        var x = 10;
    }
}

//// [unusedLocalsInMethod1.js]
var greeter = (function () {
    function greeter() {
    }
    var proto_1 = greeter.prototype;
    proto_1.function1 = function () {
        var x = 10;
    };
    return greeter;
}());
