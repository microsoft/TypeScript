//// [internalAliasFunctionInsideLocalModuleWithoutExportAccessError.js]
(function (a) {
    function foo(x) {
        return x;
    }
    a.foo = foo;
})(exports.a || (exports.a = {}));
var a = exports.a;

(function (c) {
    var b = a.foo;
    var bVal = b(10);
    c.bVal2 = b;
})(exports.c || (exports.c = {}));
var c = exports.c;
var d = c.b(11);
