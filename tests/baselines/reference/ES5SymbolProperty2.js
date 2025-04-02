//// [tests/cases/conformance/Symbols/ES5SymbolProperty2.ts] ////

//// [ES5SymbolProperty2.ts]
module M {
    var Symbol: any;

    export class C {
        [Symbol.iterator]() { }
    }
    (new C)[Symbol.iterator];
}

(new M.C)[Symbol.iterator];

//// [ES5SymbolProperty2.js]
var M;
(function (M) {
    var Symbol;
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype[Symbol.iterator] = function () { };
        return C;
    }());
    M.C = C;
    (new C)[Symbol.iterator];
})(M || (M = {}));
(new M.C)[Symbol.iterator];
