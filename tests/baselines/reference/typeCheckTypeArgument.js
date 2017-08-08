//// [typeCheckTypeArgument.ts]
var f: <T extends UNKNOWN>() => void;

interface IFoo<T extends UNKNOWN> { }

class Foo<T extends UNKNOWN> { }

function bar<T extends UNKNOWN>() { }

class Foo2 {
    method<T extends UNKNOWN>() { }
}

(<T extends UNKNOWN>(a) => { });

//// [typeCheckTypeArgument.js]
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
var f;
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
function bar() { }
var Foo2 = (function () {
    function Foo2() {
    }
    Foo2.prototype.method = function () { };
    __names(Foo2.prototype, ["method"]);
    return Foo2;
}());
(function (a) { });
