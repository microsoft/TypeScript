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
        get [Symbol.toPrimitive](): I { return undefined; }
        set [Symbol.toPrimitive](x: I) { }
    }
}

/// [Declarations] ////



//// [symbolDeclarationEmit12.d.ts]
declare namespace M {
    interface I {
    }
    export class C {
        [Symbol.iterator]: I;
        [Symbol.isConcatSpreadable](): I;
        get [Symbol.toPrimitive](): I;
        set [Symbol.toPrimitive](x: I);
    }
    export {};
}
/// [Errors] ////

symbolDeclarationEmit12.ts(9,13): error TS2300: Duplicate identifier '[Symbol.toPrimitive]'.
symbolDeclarationEmit12.ts(10,13): error TS2300: Duplicate identifier '[Symbol.toPrimitive]'.


==== symbolDeclarationEmit12.ts (2 errors) ====
    module M {
        interface I { }
        export class C {
            [Symbol.iterator]: I;
            [Symbol.toPrimitive](x: I) { }
            [Symbol.isConcatSpreadable](): I {
                return undefined
            }
            get [Symbol.toPrimitive](): I { return undefined; }
                ~~~~~~~~~~~~~~~~~~~~
!!! error TS2300: Duplicate identifier '[Symbol.toPrimitive]'.
            set [Symbol.toPrimitive](x: I) { }
                ~~~~~~~~~~~~~~~~~~~~
!!! error TS2300: Duplicate identifier '[Symbol.toPrimitive]'.
        }
    }