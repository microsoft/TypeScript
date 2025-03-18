//// [tests/cases/compiler/declarationEmitComputedPropertyName1.ts] ////

//// [declarationEmitComputedPropertyName1.ts]
// https://github.com/microsoft/TypeScript/issues/59107

declare function create<T extends {}>(): T;

export const c = create<{
  data: {
    ["a_b_c"]: string;
    ["sss"]: string;
    s_d: string;
    queryData?: string;
    ["foo bar"]: string;
  };
  ["a_b_c"]: string;
}>();

export interface IData {
  ["a_b_c"]: string;
  nested: {
    ["d_e_f"]: string;
    value: string;
    ["qwe rty"]: string;
  };
}


//// [declarationEmitComputedPropertyName1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = create();
