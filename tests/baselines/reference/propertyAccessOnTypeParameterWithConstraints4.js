//// [propertyAccessOnTypeParameterWithConstraints4.ts]
class C<T extends Date> {
    f() {
        var x: T;
        var a = x['notHere'](); // should be string
        return a + x.notHere();
    }
}

var r = (new C<Date>()).f();

interface I<T extends Date> {
    foo: T;
}
var i: I<Date>;
var r2 = i.foo.notHere();
var r2b = i.foo['notHere']();

var a: {
    <T extends Date>(): T;
}
var r3: string = a().notHere();
var r3b: string = a()['notHere']();

var b = {
    foo: <T extends Date>(x: T): T => {
        var a = x['notHere'](); // should be string
        return a + x.notHere();
    },
    bar: b.foo().notHere()
}

var r4 = b.foo(new Date());

//// [propertyAccessOnTypeParameterWithConstraints4.js]
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
var C = (function () {
    function C() {
    }
    C.prototype.f = function () {
        var x;
        var a = x['notHere'](); // should be string
        return a + x.notHere();
    };
    __names(C.prototype, ["f"]);
    return C;
}());
var r = (new C()).f();
var i;
var r2 = i.foo.notHere();
var r2b = i.foo['notHere']();
var a;
var r3 = a().notHere();
var r3b = a()['notHere']();
var b = {
    foo: function (x) {
        var a = x['notHere'](); // should be string
        return a + x.notHere();
    },
    bar: b.foo().notHere()
};
var r4 = b.foo(new Date());
