//// [stringLiteralTypesInImplementationSignatures.ts]
// String literal types are only valid in overload signatures

function foo(x: 'hi') { }
var f = function foo(x: 'hi') { }
var f2 = (x: 'hi', y: 'hi') => { }

class C {
    foo(x: 'hi') { }
}

interface I {
    (x: 'hi');
    foo(x: 'hi', y: 'hi');
}

var a: {
    (x: 'hi');
    foo(x: 'hi');
}

var b = {
    foo(x: 'hi') { },
    a: function foo(x: 'hi', y: 'hi') { },
    b: (x: 'hi') => { }
}


//// [stringLiteralTypesInImplementationSignatures.js]
// String literal types are only valid in overload signatures
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
function foo(x) { }
var f = function foo(x) { };
var f2 = function (x, y) { };
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) { };
    __names(C.prototype, ["foo"]);
    return C;
}());
var a;
var b = {
    foo: function (x) { },
    a: function foo(x, y) { },
    b: function (x) { }
};
