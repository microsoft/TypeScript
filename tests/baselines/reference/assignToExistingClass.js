//// [assignToExistingClass.ts]
module Test {
    class Mocked {
        myProp: string;
    }

    class Tester {
        willThrowError() {
            Mocked = Mocked || function () { // => Error: Invalid left-hand side of assignment expression.
                return { myProp: "test" };
            };
        }
    }
 
}


//// [assignToExistingClass.js]
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
var Test;
(function (Test) {
    var Mocked = (function () {
        function Mocked() {
        }
        return Mocked;
    }());
    var Tester = (function () {
        function Tester() {
        }
        Tester.prototype.willThrowError = function () {
            Mocked = Mocked || function () {
                return { myProp: "test" };
            };
        };
        __names(Tester.prototype, ["willThrowError"]);
        return Tester;
    }());
})(Test || (Test = {}));
