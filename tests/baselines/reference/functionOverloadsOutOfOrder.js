//// [tests/cases/compiler/functionOverloadsOutOfOrder.ts] ////

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
var d = /** @class */ (function () {
    function d() {
    }
    d.prototype.foo = function (ns) {
        return ns.toString();
    };
    return d;
}());
var e = /** @class */ (function () {
    function e() {
    }
    e.prototype.foo = function (ns) {
        return ns.toString();
    };
    return e;
}());
