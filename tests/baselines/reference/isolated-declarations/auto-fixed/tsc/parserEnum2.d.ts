//// [tests/cases/conformance/parser/ecmascript5/EnumDeclarations/parserEnum2.ts] ////

//// [parserEnum2.ts]
    export enum SignatureFlags {
        None = 0,
        IsIndexer = 1,
        IsStringIndexer = 1 << 1,
        IsNumberIndexer = 1 << 2
    }

/// [Declarations] ////



//// [parserEnum2.d.ts]
export declare enum SignatureFlags {
    None = 0,
    IsIndexer = 1,
    IsStringIndexer = 2,
    IsNumberIndexer = 4
}
