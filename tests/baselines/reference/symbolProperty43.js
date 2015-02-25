//// [symbolProperty43.ts]
class C {
    [Symbol.iterator](x: string): string;
    [Symbol.iterator](x: number): number;
}

//// [symbolProperty43.js]
var C = (function () {
    function C() {
    }
    return C;
})();
