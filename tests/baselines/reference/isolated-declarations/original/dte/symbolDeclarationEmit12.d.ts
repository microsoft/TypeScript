//// [tests/cases/conformance/es6/Symbols/symbolDeclarationEmit12.ts] ////

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

/// [Declarations] ////



//// [/.src/symbolDeclarationEmit12.d.ts]
declare namespace M {
    interface I {
    }
    export class C {
        [Symbol.iterator]: I;
        [Symbol.toPrimitive](x: I): invalid;
        [Symbol.isConcatSpreadable](): I;
        get [Symbol.toPrimitive](): invalid;
        set [Symbol.toPrimitive](x: I);
    }
    export {};
}
/// [Errors] ////

symbolDeclarationEmit12.ts(5,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
symbolDeclarationEmit12.ts(9,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== symbolDeclarationEmit12.ts (2 errors) ====
    module M {
        interface I { }
        export class C {
            [Symbol.iterator]: I;
            [Symbol.toPrimitive](x: I) { }
            ~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            [Symbol.isConcatSpreadable](): I {
                return undefined
            }
            get [Symbol.toPrimitive]() { return undefined; }
                ~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            set [Symbol.toPrimitive](x: I) { }
        }
    }