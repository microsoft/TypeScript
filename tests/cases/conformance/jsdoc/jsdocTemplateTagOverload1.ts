// @strict: true
// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: dist

// @filename: index.js

/**
 * @template {string} Element
 * @overload
 * @param {Element} element
 * @returns {() => void}
 */

/**
 * @template {boolean} Element
 * @overload
 * @param {Element} element
 * @returns {() => void}
 */

/**
 * @overload
 * @param {number} element
 * @returns {() => void}
 */

/**
 * @param {any} element
 */
export function on(element) {
	return () => {}
}
