//// [symbolDeclarationEmit11.ts]
class C {
    static [Symbol.iterator] = 0;
    static [Symbol.toPrimitive]() { }
    static get [Symbol.isRegExp]() { return ""; }
    static set [Symbol.isRegExp](x) { }
}

//// [symbolDeclarationEmit11.js]
var C = (function () {
    function C() {
    }
    C[Symbol.toPrimitive] = function () {
    };
    Object.defineProperty(C, Symbol.isRegExp, {
        get: function () {
            return "";
        },
        set: function (x) {
        },
        enumerable: true,
        configurable: true
    });
    C[Symbol.iterator] = 0;
    return C;
})();


//// [symbolDeclarationEmit11.d.ts]
declare class C {
    static [Symbol.iterator]: number;
    static [Symbol.toPrimitive](): void;
    static [Symbol.isRegExp]: string;
}
