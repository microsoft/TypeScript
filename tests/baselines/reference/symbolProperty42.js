//// [symbolProperty42.ts]
class C {
    [Symbol.iterator](x: string): string;
    static [Symbol.iterator](x: number): number;
    [Symbol.iterator](x: any) {
        return undefined;
    }
}

//// [symbolProperty42.js]
var C = (function () {
    function C() {
    }
    C.prototype[Symbol.iterator] = function (x) {
        return undefined;
    };
    return C;
})();
