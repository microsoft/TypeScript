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
    greeter.prototype.function1 = function () {
        var x, y;
        y = 1;
    };
    return greeter;
}());
