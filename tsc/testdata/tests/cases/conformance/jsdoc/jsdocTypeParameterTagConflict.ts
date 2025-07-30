// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @Filename: /a.js
/**
 * @type {(a: 1) => true}
 * @param {2} a
 */
export function conflictingParam(a) { return true }

/**
 * @type {(b: 3) => true}
 * @return {false}
 */
export function conflictingReturn(b) { return false }


/**
 * @type {(c: 4) => true}
 * @param {5} d
 * @return {false}
 */
export function conflictingBoth(d) { return false }

