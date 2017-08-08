//// [quotedPropertyName3.ts]
class Test {
    "prop1": number;
    foo() {
        var x = () => this["prop1"];
        var y: number = x();
    }
}

//// [quotedPropertyName3.js]
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
var Test = (function () {
    function Test() {
    }
    Test.prototype.foo = function () {
        var _this = this;
        var x = function () { return _this["prop1"]; };
        var y = x();
    };
    __names(Test.prototype, ["foo"]);
    return Test;
}());
