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



//// [symbolDeclarationEmit12.d.ts]
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
//# sourceMappingURL=symbolDeclarationEmit12.d.ts.map
/// [Errors] ////

symbolDeclarationEmit12.ts(5,9): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
symbolDeclarationEmit12.ts(9,13): error TS2300: Duplicate identifier '[Symbol.toPrimitive]'.
symbolDeclarationEmit12.ts(9,13): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
symbolDeclarationEmit12.ts(10,13): error TS2300: Duplicate identifier '[Symbol.toPrimitive]'.


==== symbolDeclarationEmit12.ts (4 errors) ====
    module M {
        interface I { }
        export class C {
            [Symbol.iterator]: I;
            [Symbol.toPrimitive](x: I) { }
            ~~~~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 symbolDeclarationEmit12.ts:5:9: Add a return type to the method
            [Symbol.isConcatSpreadable](): I {
                return undefined
            }
            get [Symbol.toPrimitive]() { return undefined; }
                ~~~~~~~~~~~~~~~~~~~~
!!! error TS2300: Duplicate identifier '[Symbol.toPrimitive]'.
                ~~~~~~~~~~~~~~~~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 symbolDeclarationEmit12.ts:9:13: Add a return type to the get accessor declaration.
            set [Symbol.toPrimitive](x: I) { }
                ~~~~~~~~~~~~~~~~~~~~
!!! error TS2300: Duplicate identifier '[Symbol.toPrimitive]'.
        }
    }