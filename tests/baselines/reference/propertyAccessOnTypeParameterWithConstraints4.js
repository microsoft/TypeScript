//// [propertyAccessOnTypeParameterWithConstraints4.js]
var C = (function () {
    function C() {
    }
    C.prototype.f = function () {
        var x;
        var a = x['notHere']();
        return a + x.notHere();
    };
    return C;
})();

var r = (new C()).f();

var i;
var r2 = i.foo.notHere();
var r2b = i.foo['notHere']();

var a;
var r3 = a().notHere();
var r3b = a()['notHere']();

var b = {
    foo: function (x) {
        var a = x['notHere']();
        return a + x.notHere();
    },
    bar: b.foo().notHere()
};

var r4 = b.foo(new Date());
