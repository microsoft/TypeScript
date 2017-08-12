//// [callSignaturesWithOptionalParameters.ts]
// Optional parameters should be valid in all the below casts

function foo(x?: number) { }
var f = function foo(x?: number) { }
var f2 = (x: number, y?: number) => { }

foo(1);
foo();
f(1);
f();
f2(1);
f2(1, 2);

class C {
    foo(x?: number) { }
}

var c: C;
c.foo();
c.foo(1);

interface I {
    (x?: number);
    foo(x: number, y?: number);
}

var i: I;
i();
i(1);
i.foo(1);
i.foo(1, 2);

var a: {
    (x?: number);
    foo(x?: number);
}

a();
a(1);
a.foo();
a.foo(1);

var b = {
    foo(x?: number) { },
    a: function foo(x: number, y?: number) { },
    b: (x?: number) => { }
}

b.foo();
b.foo(1);
b.a(1);
b.a(1, 2);
b.b();
b.b(1);


//// [callSignaturesWithOptionalParameters.js]
// Optional parameters should be valid in all the below casts
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
function foo(x) { }
var f = function foo(x) { };
var f2 = function (x, y) { };
foo(1);
foo();
f(1);
f();
f2(1);
f2(1, 2);
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) { };
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
var a;
a();
a(1);
a.foo();
a.foo(1);
var b = {
    foo: function (x) { },
    a: function foo(x, y) { },
    b: function (x) { }
};
b.foo();
b.foo(1);
b.a(1);
b.a(1, 2);
b.b();
b.b(1);
