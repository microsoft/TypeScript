//// [tests/cases/compiler/reuseTypeAnnotationImportTypeInGlobalThisTypeArgument.ts] ////

//// [contractHelper.d.ts]
export function handleParamGovernance(zcf: any): {
  publicMixin: {
    getGovernedParams: () => globalThis.ERef<import("./types.js").ParamStateRecord>;
  };
};

//// [exported.d.ts]
type _ERef<T> = T | Promise<T>;
import { ParamStateRecord as _ParamStateRecord } from './types.js';
declare global {
  // @ts-ignore TS2666
  export {
    _ERef as ERef,
    _ParamStateRecord as ParamStateRecord,
  };
}

//// [types.js]
export {};
/**
 * @typedef {Record<Keyword, ParamValueTyped>} ParamStateRecord a Record containing
 *   keyword pairs with descriptions of parameters under governance.
 */

//// [index.js]
import { handleParamGovernance } from './contractHelper.js';
export const blah = handleParamGovernance({});




//// [types.d.ts]
/**
 * a Record containing
 *   keyword pairs with descriptions of parameters under governance.
 */
export type ParamStateRecord = Record<Keyword, ParamValueTyped>;
//// [index.d.ts]
export const blah: {
    publicMixin: {
        getGovernedParams: () => globalThis.ERef<import("./types.js").ParamStateRecord>;
    };
};
