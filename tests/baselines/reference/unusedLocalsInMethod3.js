//// [unusedLocalsInMethod3.ts]
class greeter {
    public function1() {
        var x, y;
        y = 1;
    }
}

//// [unusedLocalsInMethod3.js]
var greeter = (function () {
    function greeter() {
    }
    var proto_1 = greeter.prototype;
    proto_1.function1 = function () {
        var x, y;
        y = 1;
    };
    return greeter;
}());
