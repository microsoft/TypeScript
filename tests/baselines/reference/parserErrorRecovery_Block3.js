//// [parserErrorRecovery_Block3.ts]
class C  {
    private a(): boolean {

    private b(): boolean {
    }
}

//// [parserErrorRecovery_Block3.js]
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
var C = (function () {
    function C() {
    }
    C.prototype.a = function () {
    };
    C.prototype.b = function () {
    };
    __names(C.prototype, ["a", "b"]);
    return C;
}());
