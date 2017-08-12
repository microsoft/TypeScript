//// [unusedPrivateVariableInClass4.ts]
class greeter {
    private x: string;
    private y: string;
    public  z: string;

    public method1() {
        this.x = "dummy value";
    }
}

//// [unusedPrivateVariableInClass4.js]
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
    greeter.prototype.method1 = function () {
        this.x = "dummy value";
    };
    __names(greeter.prototype, ["method1"]);
    return greeter;
}());
