//// [tests/cases/conformance/parser/ecmascript5/EnumDeclarations/parserEnum1.ts] ////

//// [parserEnum1.ts]
    export enum SignatureFlags {
        None = 0,
        IsIndexer = 1,
        IsStringIndexer = 1 << 1,
        IsNumberIndexer = 1 << 2,
    }

/// [Declarations] ////



//// [parserEnum1.d.ts]
export declare enum SignatureFlags {
    None = 0,
    IsIndexer = 1,
    IsStringIndexer = 2,
    IsNumberIndexer = 4
}

/// [Errors] ////

parserEnum1.ts(4,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserEnum1.ts(5,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== parserEnum1.ts (2 errors) ====
        export enum SignatureFlags {
            None = 0,
            IsIndexer = 1,
            IsStringIndexer = 1 << 1,
            ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            IsNumberIndexer = 1 << 2,
            ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }