//// [stringLiteralTypesInImplementationSignatures2.ts]
// String literal types are only valid in overload signatures

function foo(x: any);
function foo(x: 'hi') { }

class C {
    foo(x: string);
    foo(x: 'hi') { }
}

interface I {
    (x: 'a');
    (x: 'hi');
    foo(x: 'a', y: 'a');
    foo(x: 'hi', y: 'hi');
}

var a: {
    (x: 'hi');
    (x: 'a');
    foo(x: 'hi');
    foo(x: 'a');
}

var b = {
    foo(x: 'hi') { },
    foo(x: 'a') { },
}


//// [stringLiteralTypesInImplementationSignatures2.js]
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
    foo: function (x) { }
};
