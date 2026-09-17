// @allowJs: true
// @checkJs: true
// @module: nodenext
// @noEmit: true
// @noUnusedLocals: true

// @filename: types.d.mts
export type Foo = Error & { code: "X" };
export type Bar = Error & { code: "Y" };

// @filename: isFoo.mjs
/** @import { Foo, Bar } from "./types.d.mts" */

/** @type {(e: unknown) => e is Foo} */
export function isFoo(e) {
    return e instanceof Error && "code" in e && e.code === "X";
}

export default /** @type {(e: unknown) => e is Bar} */ (e) => {
    return e instanceof Error && "code" in e && e.code === "Y";
};

/** @type {(e: unknown) => e is Missing} */
export function isMissing(e) {
    return !!e;
}

/** @type {(e: unknown) => asserts e is MissingAsserted} */
export function assertMissing(e) {
    if (!e) {
        throw new TypeError();
    }
}

// @filename: missingExpression.mjs
export default /** @type {(e: unknown) => e is MissingExpression} */ (e) => !!e;
