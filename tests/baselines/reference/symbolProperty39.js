//// [symbolProperty39.ts]
class C {
    [Symbol.iterator](x: string): string;
    [Symbol.iterator](x: number): number;
    [Symbol.iterator](x: any) {
        return undefined;
    }
    [Symbol.iterator](x: any) {
        return undefined;
    }
}

//// [symbolProperty39.js]
var C = (function () {
    function C() {
    }
    C.prototype[Symbol.iterator] = function (x) {
        return undefined;
    };
    C.prototype[Symbol.iterator] = function (x) {
        return undefined;
    };
    return C;
})();
