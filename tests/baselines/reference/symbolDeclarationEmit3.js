//// [symbolDeclarationEmit3.ts]
class C {
    [Symbol.isRegExp](x: number);
    [Symbol.isRegExp](x: string);
    [Symbol.isRegExp](x: any) { }
}

//// [symbolDeclarationEmit3.js]
var C = (function () {
    function C() {
    }
    C.prototype[Symbol.isRegExp] = function (x) { };
    return C;
})();


//// [symbolDeclarationEmit3.d.ts]
declare class C {
    [Symbol.isRegExp](x: number): any;
    [Symbol.isRegExp](x: string): any;
}
