// @checkJs: true
// @allowJs: true
// @noEmit: true
// @strict: true

// @filename: index.js

/**
 * @param {any} v
 */
function identity(v) {
    return v;
}

const x = identity(
    /**
     * @param {number} param
     * @returns {number=}
     */
    param => param
);
