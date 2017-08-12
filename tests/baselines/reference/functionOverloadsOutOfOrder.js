//// [functionOverloadsOutOfOrder.ts]
class d {
    private foo(n: number): string;
    private foo(ns: any) {
        return ns.toString();
    }
    private foo(s: string): string;
}

class e {
    private foo(ns: any) {
        return ns.toString();
    }
    private foo(s: string): string;
    private foo(n: number): string;
}

//// [functionOverloadsOutOfOrder.js]
var d = (function () {
    function d() {
    }
    var proto_1 = d.prototype;
    proto_1.foo = function (ns) {
        return ns.toString();
    };
    return d;
}());
var e = (function () {
    function e() {
    }
    var proto_2 = e.prototype;
    proto_2.foo = function (ns) {
        return ns.toString();
    };
    return e;
}());
