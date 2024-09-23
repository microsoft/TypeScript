//// [tests/cases/compiler/jsDocDeclarationEmitDoesNotUseNodeModulesPathWithoutError.ts] ////

//// [package.json]
{
    "name": "typescript-issue",
    "private": true,
    "version": "0.0.0",
    "type": "module"
}
//// [package.json]
{
    "name": "@lion/ajax",
    "version": "2.0.2",
    "type": "module",
    "exports": {
      ".": {
        "types": "./dist-types/src/index.d.ts",
        "default": "./src/index.js"
      },
      "./docs/*": "./docs/*"
    }
}
//// [index.d.ts]
export type LionRequestInit = import('../types/types.js').LionRequestInit;
//// [types.d.ts]
export interface LionRequestInit {
    body?: null | Object;
} 
//// [index.js]
/**
 * @typedef {import('@lion/ajax').LionRequestInit} LionRequestInit
 */

export class NewAjax {
    /**
     * @param {LionRequestInit} [init]
     */
    case5_unexpectedlyResolvesPathToNodeModules(init) {}
}

/**
 * @type {(init?: LionRequestInit) => void}
 */
// @ts-expect-error
NewAjax.prototype.case6_unexpectedlyResolvesPathToNodeModules;



//// [index.d.ts]
/**
 * @typedef {import('@lion/ajax').LionRequestInit} LionRequestInit
 */
export class NewAjax {
    /**
     * @param {LionRequestInit} [init]
     */
    case5_unexpectedlyResolvesPathToNodeModules(init?: LionRequestInit): void;
    /**
     * @type {(init?: LionRequestInit) => void}
     */
    case6_unexpectedlyResolvesPathToNodeModules: (init?: LionRequestInit) => void;
}
export type LionRequestInit = import("@lion/ajax").LionRequestInit;
