//// [unusedClassesinModule1.ts]
module A {
    class Calculator {
        public handelChar() {
        }
    }
}

//// [unusedClassesinModule1.js]
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
var A;
(function (A) {
    var Calculator = (function () {
        function Calculator() {
        }
        Calculator.prototype.handelChar = function () {
        };
        __names(Calculator.prototype, ["handelChar"]);
        return Calculator;
    }());
})(A || (A = {}));
