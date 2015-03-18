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
    class C {
        [Symbol.toPrimitive](x) {
        }
        [Symbol.isConcatSpreadable]() {
            return undefined;
        }
        get [Symbol.isRegExp]() {
            return undefined;
        }
        set [Symbol.isRegExp](x) {
        }
    }
    M.C = C;
})(M || (M = {}));
