//// [symbolDeclarationEmit12.ts]
module M {
    interface I { }
    export class C {
        [Symbol.iterator]: I;
        [Symbol.toPrimitive](x: I) { }
        [Symbol.isConcatSpreadable](): I {
            return undefined
        }
        get [Symbol.toPrimitive]() { return undefined; }
        set [Symbol.toPrimitive](x: I) { }
    }
}

//// [symbolDeclarationEmit12.js]
var M;
(function (M) {
    class C {
        [(Symbol.iterator, Symbol.toPrimitive)](x) { }
        [Symbol.isConcatSpreadable]() {
            return undefined;
        }
        get [Symbol.toPrimitive]() { return undefined; }
        set [Symbol.toPrimitive](x) { }
    }
    M.C = C;
})(M || (M = {}));


//// [symbolDeclarationEmit12.d.ts]
declare module M {
    interface I {
    }
    export class C {
        [Symbol.iterator]: I;
        [Symbol.toPrimitive](x: I): void;
        [Symbol.isConcatSpreadable](): I;
        get [Symbol.toPrimitive](): any;
        set [Symbol.toPrimitive](x: I);
    }
    export {};
}
