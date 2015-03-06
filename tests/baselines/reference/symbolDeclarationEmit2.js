//// [symbolDeclarationEmit2.ts]
class C {
    [Symbol.isRegExp] = "";
}

//// [symbolDeclarationEmit2.js]
var C = (function () {
    function C() {
        this[Symbol.isRegExp] = "";
    }
    return C;
})();


//// [symbolDeclarationEmit2.d.ts]
declare class C {
    [Symbol.isRegExp]: string;
}
