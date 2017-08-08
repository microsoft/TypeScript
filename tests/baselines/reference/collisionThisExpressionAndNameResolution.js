//// [collisionThisExpressionAndNameResolution.ts]
var console : {
    log(message: any);
}
class Foo {
    x() {
        var _this = 10; // Local var. No this capture in x(), so no conflict.
        function inner() {
            console.log(_this); // Error as this doesnt not resolve to user defined _this
            return x => this;   // New scope.  So should inject new _this capture into function inner
        }
    }
}

//// [collisionThisExpressionAndNameResolution.js]
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
var console;
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.x = function () {
        var _this = 10; // Local var. No this capture in x(), so no conflict.
        function inner() {
            var _this = this;
            console.log(_this); // Error as this doesnt not resolve to user defined _this
            return function (x) { return _this; }; // New scope.  So should inject new _this capture into function inner
        }
    };
    __names(Foo.prototype, ["x"]);
    return Foo;
}());
