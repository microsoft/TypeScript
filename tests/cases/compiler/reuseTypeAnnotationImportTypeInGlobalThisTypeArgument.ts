// @checkJs: true
// @declaration: true
// @module: preserve
// @emitDeclarationOnly: true
// @noTypesAndSymbols: true

// @Filename: /contractHelper.d.ts
export function handleParamGovernance(zcf: any): {
  publicMixin: {
    getGovernedParams: () => globalThis.ERef<import("./types.js").ParamStateRecord>;
  };
};

// @Filename: /exported.d.ts
type _ERef<T> = T | Promise<T>;
import { ParamStateRecord as _ParamStateRecord } from './types.js';
declare global {
  // @ts-ignore TS2666
  export {
    _ERef as ERef,
    _ParamStateRecord as ParamStateRecord,
  };
}

// @Filename: /types.js
export {};
/**
 * @typedef {Record<Keyword, ParamValueTyped>} ParamStateRecord a Record containing
 *   keyword pairs with descriptions of parameters under governance.
 */

// @Filename: /index.js
import { handleParamGovernance } from './contractHelper.js';
export const blah = handleParamGovernance({});
