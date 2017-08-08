//// [genericCloduleInModule.ts]
module A {
    export class B<T> {
        foo() { }
        static bar() { }
    }
    export module B {
        export var x = 1;
    }
}

var b: A.B<number>;
b.foo();

//// [genericCloduleInModule.js]
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
var A;
(function (A) {
    var B = (function () {
        function B() {
        }
        B.prototype.foo = function () { };
        B.bar = function () { };
        __names(B.prototype, ["foo"]);
        return B;
    }());
    A.B = B;
    (function (B) {
        B.x = 1;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var b;
b.foo();
