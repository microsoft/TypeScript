//// [unusedLocalsInMethod3.ts]
class greeter {
    public function1() {
        var x, y;
        y = 1;
    }
}

//// [unusedLocalsInMethod3.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var greeter = (function () {
    function greeter() {
    }
    greeter.prototype.function1 = function () {
        var x, y;
        y = 1;
    };
    __names(greeter.prototype, ["function1"]);
    return greeter;
}());
