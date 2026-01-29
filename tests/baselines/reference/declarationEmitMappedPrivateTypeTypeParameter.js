//// [tests/cases/compiler/declarationEmitMappedPrivateTypeTypeParameter.ts] ////

//// [Helpers.ts]
export type StringKeyOf<TObj> = Extract<string, keyof TObj>;

//// [FromFactor.ts]
export type RowToColumns<TColumns> = {
    [TName in StringKeyOf<TColumns>]: any;
}

//// [Helpers.js]
export {};
//// [FromFactor.js]
export {};


//// [Helpers.d.ts]
export type StringKeyOf<TObj> = Extract<string, keyof TObj>;
//// [FromFactor.d.ts]
export type RowToColumns<TColumns> = {
    [TName in StringKeyOf<TColumns>]: any;
};
