// @strict: true
// @declaration: true
// @module: nodenext

// @filename: node_modules/some-dep/dist/inner.d.ts
export declare type Other = { other: string };
export declare type SomeType = { arg: Other };

// @filename: node_modules/some-dep/dist/other.d.ts
export declare const shouldLookupName: unique symbol;
export declare const shouldReuseLocalName: unique symbol;
export declare const reuseDepName: unique symbol;
export declare const shouldBeElided: unique symbol;
export declare const isNotAccessibleShouldError: unique symbol;

// @filename: node_modules/some-dep/dist/index.d.ts
import { Other } from './inner'
import { shouldLookupName, reuseDepName, shouldReuseLocalName, shouldBeElided } from './other'
export declare const goodDeclaration: <T>() => () => { 
  /** Other Can't be named in index.ts, but the whole conditional type can be resolved  */
  shouldPrintResult: T extends Other? "O": "N",
  /** Symbol shouldBeElided should not be present in index.d.ts, it might be since it's tracked before Other is seen and an error reported */ 
  shouldPrintResult2: T extends typeof shouldBeElided? Other: "N", 
  /** Specifier should come from module, local path should not be reused */ 
  shouldLookupName: typeof import('./other').shouldLookupName,
  /** This is imported in index so local name should be reused */ 
  shouldReuseLocalName: typeof shouldReuseLocalName
  /** This is NOT imported in index so import should be created */ 
  reuseDepName: typeof reuseDepName,
}
export { shouldLookupName, shouldReuseLocalName, reuseDepName, shouldBeElided };

// @filename: node_modules/some-dep/package.json
{
  "name": "some-dep",
  "exports": {
    ".": "./dist/index.js"
  }
}

// @filename: src/index.ts
import { goodDeclaration, shouldReuseLocalName, shouldBeElided } from "some-dep";
export const bar = goodDeclaration<{}>;

