//// [symbolProperty40.ts]
class C {
    [Symbol.iterator](x: string): string;
    [Symbol.iterator](x: number): number;
    [Symbol.iterator](x: any) {
        return undefined;
    }
}

var c = new C;
c[Symbol.iterator]("");
c[Symbol.iterator](0);


//// [symbolProperty40.js]
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
c[Symbol.iterator](0);
