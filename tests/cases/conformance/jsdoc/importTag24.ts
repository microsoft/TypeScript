// @checkJs: true
// @allowJs: true
// @noEmit: true
// @lib: esnext
// @moduleResolution: bundler
// @module: preserve
// @noUnusedLocals: true
// @noUnusedParameters: true
// @allowImportingTsExtensions: true

// @filename: types.d.ts
export type Foo = string;

// @filename: a.js
/** @import { Foo } from './types.d.ts' */

function f1() { return undefined; }

export function f2() {
    /** @type {Set<Foo>} */
    const foo = new Set([ 'a', 'b' ]);
    return foo;
}

function f3() { return undefined; }

/** @type {Set<Foo>} */
export const foo = new Set([ 'a', 'b' ]);

/**
 * @returns {Foo}
 */
function f4() { return 1; }
