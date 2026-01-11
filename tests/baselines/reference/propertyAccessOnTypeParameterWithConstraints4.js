//// [tests/cases/conformance/types/typeParameters/typeParameterLists/propertyAccessOnTypeParameterWithConstraints4.ts] ////

//// [propertyAccessOnTypeParameterWithConstraints4.ts]
class C<T extends Date> {
    f() {
        var x: T = {} as any;
        var a = x['notHere'](); // should be string
        return a + x.notHere();
    }
}

var r = (new C<Date>()).f();

interface I<T extends Date> {
    foo: T;
}
declare var i: I<Date>;
var r2 = i.foo.notHere();
var r2b = i.foo['notHere']();

declare var a: {
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
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.f = function () {
        var x = {};
        var a = x['notHere'](); // should be string
        return a + x.notHere();
    };
    return C;
}());
var r = (new C()).f();
var r2 = i.foo.notHere();
var r2b = i.foo['notHere']();
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
