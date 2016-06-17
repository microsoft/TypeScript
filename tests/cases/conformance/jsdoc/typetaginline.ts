// @allowJs: true
// @filename: typetaginline.js
// @out: dummy174.js
/**
 * Inline type info only.
 */
function dispense(/** @type {string} */ candy) {}

/**
 * Inline type info that conflicts with `@param` tag.
 *
 * @class
 * @param {number} candyId - The candy's identifier.
 */
function Dispenser(/** @type {string} */ candyId) {}

/**
 * Inline type info for leading param only.
 *
 * @param {string} item
 */
function restock(/** @type {Dispenser} */ dispenser, item) {}

/**
 * Inline type info for trailing param only.
 *
 * @param {Dispenser} dispenser
 */
function clean(dispenser, /** @type {string} */ cleaner) {}

/**
 * Inline type info for inner param only.
 *
 * @param {Dispenser} dispenser
 * @param {number} shade
 * @param {string} brand
 */
function paint(dispenser, /** @type {Color} */ color, shade, brand) {}
