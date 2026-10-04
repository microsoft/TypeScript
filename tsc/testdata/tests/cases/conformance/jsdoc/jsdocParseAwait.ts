// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js

/**
 * @typedef {object} T
 * @property {boolean} await
 */

/** @type {T} */
const a = 1;

/** @type {T} */
const b = {
    await: false,
};

/**
 * @param {boolean} await
 */
function c(await) {}
