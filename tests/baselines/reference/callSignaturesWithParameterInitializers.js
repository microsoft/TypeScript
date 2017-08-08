//// [callSignaturesWithParameterInitializers.ts]
// Optional parameters allow initializers only in implementation signatures

function foo(x = 1) { }
var f = function foo(x = 1) { }
var f2 = (x: number, y = 1) => { }

foo(1);
foo();
f(1);
f();
f2(1);
f2(1, 2);

class C {
    foo(x = 1) { }
}

var c: C;
c.foo();
c.foo(1);

// these are errors
interface I {
    (x = 1);
    foo(x: number, y = 1);
}

var i: I;
i();
i(1);
i.foo(1);
i.foo(1, 2);

// these are errors
var a: {
    (x = 1);
    foo(x = 1);
}

a();
a(1);
a.foo();
a.foo(1);

var b = {
    foo(x = 1) { },
    a: function foo(x: number, y = 1) { },
    b: (x = 1) => { }
}

b.foo();
b.foo(1);
b.a(1);
b.a(1, 2);
b.b();
b.b(1);


//// [callSignaturesWithParameterInitializers.js]
// Optional parameters allow initializers only in implementation signatures
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
function foo(x) {
    if (x === void 0) { x = 1; }
}
var f = function foo(x) {
    if (x === void 0) { x = 1; }
};
var f2 = function (x, y) {
    if (y === void 0) { y = 1; }
};
foo(1);
foo();
f(1);
f();
f2(1);
f2(1, 2);
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
var i;
i();
i(1);
i.foo(1);
i.foo(1, 2);
// these are errors
var a;
a();
a(1);
a.foo();
a.foo(1);
var b = {
    foo: function (x) {
        if (x === void 0) { x = 1; }
    },
    a: function foo(x, y) {
        if (y === void 0) { y = 1; }
    },
    b: function (x) {
        if (x === void 0) { x = 1; }
    }
};
b.foo();
b.foo(1);
b.a(1);
b.a(1, 2);
b.b();
b.b(1);
