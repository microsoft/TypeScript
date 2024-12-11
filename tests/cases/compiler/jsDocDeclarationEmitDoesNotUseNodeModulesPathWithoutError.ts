// @allowJs: true
// @checkJs: true
// @strict: true
// @target: esnext
// @module: nodenext
// @moduleResolution: nodenext
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: ./dist-types
// @filename: package.json
{
    "name": "typescript-issue",
    "private": true,
    "version": "0.0.0",
    "type": "module"
}
// @filename: node_modules/@lion/ajax/package.json
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
// @filename: node_modules/@lion/ajax/dist-types/src/index.d.ts
export type LionRequestInit = import('../types/types.js').LionRequestInit;
// @filename: node_modules/@lion/ajax/dist-types/types/types.d.ts
export interface LionRequestInit {
    body?: null | Object;
} 
// @filename: index.js
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