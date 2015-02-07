//// [symbolDeclarationEmit4.ts]
class C {
    get [Symbol.isRegExp]() { return ""; }
    set [Symbol.isRegExp](x) { }
}

//// [symbolDeclarationEmit4.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, Symbol.isRegExp, {
        get: function () {
            return "";
        },
        set: function (x) { },
        enumerable: true,
        configurable: true
    });
    return C;
})();


//// [symbolDeclarationEmit4.d.ts]
declare class C {
    [Symbol.isRegExp]: string;
}
