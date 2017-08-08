//// [parametersWithNoAnnotationAreAny.ts]
function foo(x) { return x; }
var f = function foo(x) { return x; }
var f2 = (x) => x;
var f3 = <T>(x) => x;

class C {
    foo(x) {
        return x;
    }
}

interface I {
    foo(x);
    foo2(x, y);
}

var a: {
    foo(x);
}

var b = {
    foo(x) {
        return x;
    },
    a: function foo(x) {
        return x;
    },
    b: (x) => x
}

//// [parametersWithNoAnnotationAreAny.js]
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
function foo(x) { return x; }
var f = function foo(x) { return x; };
var f2 = function (x) { return x; };
var f3 = function (x) { return x; };
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
        return x;
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
var a;
var b = {
    foo: function (x) {
        return x;
    },
    a: function foo(x) {
        return x;
    },
    b: function (x) { return x; }
};
