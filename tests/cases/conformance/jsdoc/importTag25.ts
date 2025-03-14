// @noUnusedLocals: true
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: types.d.ts
export type T = {
    a: number;
};

// @filename: foo.js
/** @import { T } from "./types.d.ts" */

export default async function f() {
	/** @type {T[]} */
	const types = [];
	return types;
}
