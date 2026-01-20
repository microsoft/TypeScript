// @checkJs: true
// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: /types.ts
export type X = 1;

// @filename: /foo.js
/**
 * @import defer * as ns from "./types"
 */

/**
 * @type { ns.X }
 */
let a = 2;
