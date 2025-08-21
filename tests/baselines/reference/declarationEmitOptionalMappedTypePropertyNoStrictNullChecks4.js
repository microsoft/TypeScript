//// [tests/cases/compiler/declarationEmitOptionalMappedTypePropertyNoStrictNullChecks4.ts] ////

//// [declarationEmitOptionalMappedTypePropertyNoStrictNullChecks4.ts]
type InputType = { enable_member_receipts?: boolean };
type AsEmptyObject<T> = { [K in keyof T]?: undefined };

export const test = {
  ...({} as AsEmptyObject<InputType>),
};




//// [declarationEmitOptionalMappedTypePropertyNoStrictNullChecks4.d.ts]
export declare const test: {
    enable_member_receipts?: undefined;
};
