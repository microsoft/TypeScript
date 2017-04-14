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
    greeter.prototype.function1 = function () {
        var x = 10;
    };
    return greeter;
}());
