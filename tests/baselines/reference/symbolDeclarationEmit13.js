//// [symbolDeclarationEmit13.ts]
class C {
    get [Symbol.isRegExp]() { return ""; }
    set [Symbol.toStringTag](x) { }
}

//// [symbolDeclarationEmit13.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, Symbol.isRegExp, {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C.prototype, Symbol.toStringTag, {
        set: function (x) {
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();


//// [symbolDeclarationEmit13.d.ts]
declare class C {
    [Symbol.isRegExp]: string;
    [Symbol.toStringTag]: any;
}
