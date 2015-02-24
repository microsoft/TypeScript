//// [symbolDeclarationEmit1.ts]
class C {
    [Symbol.isRegExp]: number;
}

//// [symbolDeclarationEmit1.js]
var C = (function () {
    function C() {
    }
    return C;
})();


//// [symbolDeclarationEmit1.d.ts]
declare class C {
    [Symbol.isRegExp]: number;
}
