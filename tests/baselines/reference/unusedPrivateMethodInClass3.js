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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
    __names(greeter.prototype, ["function1", "function2", "function3"]);
    return greeter;
}());
