//// [symbolDeclarationEmit12.ts]
module M {
    interface I { }
    export class C {
        [Symbol.iterator]: I;
        [Symbol.toPrimitive](x: I) { }
        [Symbol.isConcatSpreadable](): I {
            return undefined
        }
        get [Symbol.isRegExp]() { return undefined; }
        set [Symbol.isRegExp](x: I) { }
    }
}

//// [symbolDeclarationEmit12.js]
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        C.prototype[Symbol.toPrimitive] = function (x) { };
        C.prototype[Symbol.isConcatSpreadable] = function () {
            return undefined;
        };
        Object.defineProperty(C.prototype, Symbol.isRegExp, {
            get: function () { return undefined; },
            set: function (x) { },
            enumerable: true,
            configurable: true
        });
        return C;
    })();
    M.C = C;
})(M || (M = {}));
