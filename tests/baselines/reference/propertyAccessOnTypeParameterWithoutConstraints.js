//// [propertyAccessOnTypeParameterWithoutConstraints.ts]
class C<T> {
    f() {
        var x: T;
        var a = x['toString'](); // should be string
        return a + x.toString();
    }
}

var r = (new C<number>()).f();

interface I<T> {
    foo: T;
}
var i: I<number>;
var r2 = i.foo.toString();
var r2b = i.foo['toString']();

var a: {
    <T>(): T;
}
var r3: string = a().toString();
var r3b: string = a()['toString']();

var b = {
    foo: <T>(x: T) => {
        var a = x['toString'](); // should be string
        return a + x.toString();
    }
}

var r4 = b.foo(1);

//// [propertyAccessOnTypeParameterWithoutConstraints.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.f = function () {
        var x;
        var a = x['toString'](); // should be string
        return a + x.toString();
    };
    return C;
}());
var r = (new C()).f();
var i;
var r2 = i.foo.toString();
var r2b = i.foo['toString']();
var a;
var r3 = a().toString();
var r3b = a()['toString']();
var b = {
    foo: function (x) {
        var a = x['toString'](); // should be string
        return a + x.toString();
    }
};
var r4 = b.foo(1);
