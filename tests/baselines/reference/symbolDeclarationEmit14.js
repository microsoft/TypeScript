//// [symbolDeclarationEmit14.ts]
class C {
    get [Symbol.isRegExp]() { return ""; }
    get [Symbol.toStringTag]() { return ""; }
}

//// [symbolDeclarationEmit14.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, Symbol.isRegExp, {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C.prototype, Symbol.toStringTag, {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return C;
})();


//// [symbolDeclarationEmit14.d.ts]
declare class C {
    [Symbol.isRegExp]: string;
    [Symbol.toStringTag]: string;
}
