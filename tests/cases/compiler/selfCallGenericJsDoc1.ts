// @strict: true
// @noEmit: true
// @checkJs: true
// @allowJs: true

// @filename: index.js

/**
 * @template T
 * @typedef {T & { children: Children<T>[] | undefined }} Children
 */

/**
 * @template T
 * @param {Children<T>[]} groups item and groups
 */
export const spaceLimited = (groups) => {
	for (let i = 0; i < groups.length; i++) {
		const group = groups[i];
		spaceLimited(/** @type {Children<T>} */(group.children)); // should error
	}
};
