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

// @filename: inferredArrow.mjs
/** @import { Foo } from "./types.d.mts" */

const arr = /** @type {unknown[]} */ ([]);

// Passed as an argument to a generic, overloaded function, so this arrow is
// checked once with CheckModeSkipContextSensitive during overload resolution.
export const foos = arr.filter(/** @type {(e: unknown) => e is Foo} */ (e) => e instanceof Error);
export const missings = arr.filter(/** @type {(e: unknown) => e is InferredMissing} */ (e) => !!e);
