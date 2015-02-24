//// [symbolProperty41.ts]
class C {
    [Symbol.iterator](x: string): { x: string };
    [Symbol.iterator](x: "hello"): { x: string; hello: string };
    [Symbol.iterator](x: any) {
        return undefined;
    }
}

var c = new C;
c[Symbol.iterator]("");
c[Symbol.iterator]("hello");


//// [symbolProperty41.js]
var C = (function () {
    function C() {
    }
    C.prototype[Symbol.iterator] = function (x) {
        return undefined;
    };
    return C;
})();
var c = new C;
c[Symbol.iterator]("");
c[Symbol.iterator]("hello");
