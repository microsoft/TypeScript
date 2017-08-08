//// [callSignaturesWithParameterInitializers2.ts]
// Optional parameters allow initializers only in implementation signatures
// All the below declarations are errors

function foo(x = 2);
function foo(x = 1) { }

foo(1);
foo();

class C {
    foo(x = 2);
    foo(x = 1) { }
}

var c: C;
c.foo();
c.foo(1);

var b = {
    foo(x = 1), // error
    foo(x = 1) { }, // error
}

b.foo();
b.foo(1);

//// [callSignaturesWithParameterInitializers2.js]
// Optional parameters allow initializers only in implementation signatures
// All the below declarations are errors
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
function foo(x) {
    if (x === void 0) { x = 1; }
}
foo(1);
foo();
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
        if (x === void 0) { x = 1; }
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
var c;
c.foo();
c.foo(1);
var b = {
    foo: function (x) {
        if (x === void 0) { x = 1; }
    },
    foo: function (x) {
        if (x === void 0) { x = 1; }
    }
};
b.foo();
b.foo(1);
