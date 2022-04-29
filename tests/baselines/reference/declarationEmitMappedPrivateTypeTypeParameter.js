//// [tests/cases/compiler/declarationEmitMappedPrivateTypeTypeParameter.ts] ////

//// [Helpers.ts]
export type StringKeyOf<TObj> = Extract<string, keyof TObj>;

//// [FromFactor.ts]
export type RowToColumns<TColumns> = {
    [TName in StringKeyOf<TColumns>]: any;
}

//// [Helpers.js]
"use strict";
exports.__esModule = true;
//// [FromFactor.js]
"use strict";
exports.__esModule = true;


//// [Helpers.d.ts]
export declare type StringKeyOf<TObj> = Extract<string, keyof TObj>;
